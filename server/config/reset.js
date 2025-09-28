import { pool } from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";

const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        artists TEXT[] NOT NULL,
        time VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        venue VARCHAR(255) NOT NULL,
        genre VARCHAR(255) NOT NULL,
        ticketprice VARCHAR(10) NOT NULL,
        image TEXT NOT NULL
        )
    `;
const createEventsTable = async () => {
  try {
    const res = await pool.query(createTableQuery);
    console.log("Gifts successfully created");
  } catch (error) {
    console.log("Could not create table", error);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();
  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (name, artists, time, date, venue, genre, ticketprice, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    };
    const values = [
      event.name,
      event.artists,
      event.time,
      event.date,
      event.venue,
      event.genre,
      event.ticketPrice,
      event.image,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("error inserting event", err);
        return;
      }

      console.log(`💯${event.name} added successfully`);
    });
  });
};

seedEventsTable();
