import database from "src/infra/database.js";
import { v4 as uuidv4 } from "uuid"; // For generating UUIDs

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Get fullName, email, and the new 'event' field from the request body
  const { fullName, email, event } = req.body;

  // Basic validation: ensure all required fields are provided
  if (!fullName || !email || !event) {
    return res
      .status(400)
      .json({ message: "Full name, email, and event name are required." });
  }

  try {
    const newId = uuidv4(); // Generate a unique ID for the new registration
    const createdAt = new Date(); // Get current timestamp

    // Execute the SQL INSERT query using your database utility.
    // The query includes the new 'event' column.
    const result = await database.query({
      text: 'INSERT INTO registrations(id, "fullName", email, event, "createdAt") VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [newId, fullName, email, event, createdAt], // Ensure 'event' is passed as a value
    });

    // Send a success response back to the frontend
    return res.status(200).json({
      message: "Registration successful!",
      registration: result.rows[0], // Return the inserted record
    });
  } catch (error) {
    // Handle specific errors like unique constraint violation (e.g., email already registered)
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "This email is already registered for this event." });
    }

    // Log unexpected errors to the server console
    console.error("Error saving registration:", error);
    // Send a generic error message to the frontend
    return res
      .status(500)
      .json({ message: "Internal server error during registration." });
  }
}
