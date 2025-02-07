const { Webhook } = require("svix"); // Use Webhook, not Svix
const User = require("../Models/User");

// Clerk Webhook Handler
exports.clerkWebhook = async (req, res) => {
  try {
    const svixSecret = process.env.CLERK_SECRET_KEY;
    if (!svixSecret) throw new Error("Missing Clerk Webhook Secret");

    // Initialize Webhook verifier
    const webhook = new Webhook(svixSecret);

    // Verify Webhook Signature
    const payloadString = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    };

    const event = webhook.verify(payloadString, headers);

    console.log("Webhook Event:", event);

    const { data, type } = event;

    switch (type) {
      case "user.created":
        const user = await User.create({
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          resume: "",
        });
        res.status(201).json({ message: "User created successfully", user });
        break;

      case "user.updated":
        const updatedUser = await User.findByIdAndUpdate(
          data.id,
          {
            name: `${data.first_name} ${data.last_name}`,
            email: data.email_addresses[0].email_address,
            image: data.image_url,
          },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "User updated successfully", updatedUser });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        res.status(200).json({ message: "User deleted successfully" });
        break;

      default:
        console.log("Unhandled webhook type:", type);
        res.status(400).json({ message: "Invalid webhook type" });
    }
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(400).json({ message: "Invalid webhook" });
  }
};
