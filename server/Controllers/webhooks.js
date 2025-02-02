const Webhook = require("svix");
const User = require("../Models/User");

// API controller to manage clerk User with database
exports.clerkWebhook = async (req, res) => {
  try {
    // Create a Svix instance with clerk secret key
    const whook = new Webhook(process.env.CLERK_SECRET_KEY);
    //Verify headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    // Extract data from the webhook
    const { data, type } = req.body;
    // Switch case for different types of webhooks

    switch (type) {
      case "user.created":
        // Create a new user in the database
        const user = await User.create({
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          resume: "",
        });
        res.json({ message: "User created successfully", user });
        break;
      case "user.updated":
        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(data.id, {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        });
        res.json({ message: "User updated successfully", user });
        break;
      case "user.deleted":
        // Delete the user from the database
        const deletedUser = await User.findByIdAndDelete(data.id);
        res.json({ message: "User deleted successfully", user });
        break;
      default:
        console.log("Invalid webhook type");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid webhook" });
  }
};
