import { pool } from "../config/database.js";

const getEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY id ASC");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getEvents,
};
