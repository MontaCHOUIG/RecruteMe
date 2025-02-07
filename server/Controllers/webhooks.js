const { Svix } = require("svix");
const User = require("../Models/User");

// API controller to manage Clerk User with database
exports.clerkWebhook = async (req, res) => {
  try {
    // Clerk's webhook secret from environment variables
    const svixSecret = process.env.CLERK_SECRET_KEY;

    if (!svixSecret) {
      throw new Error("Missing Clerk Webhook Secret");
    }

    // Create an instance of Svix
    const svix = new Svix(svixSecret);

    // Verify the incoming webhook
    const event = svix.webhooks.verify(req.headers, req.body);

    console.log("Webhook Event:", event);

    // Extract data from the webhook
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
