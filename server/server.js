import express from "express";
import dotenv from "dotenv";
import db from "./db.js";
import cors from "cors";

dotenv.config({ path: "./server/.env" });

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(express.json());
app.use(express.static("public"));

app.route("/users/login").post(async (req, res) => {
  const { body } = req;
  try {
    const data = await db.query(
      `SELECT user_id FROM users WHERE username = '${body.username}' AND password = '${body.password}'`
    );
    data.rows.length !== 0
      ? res.status(200).json({ validation: true, data: data.rows })
      : res.status(404).json({ validation: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.route("/users/signup").post(async (req, res) => {
  const { body } = req;
  try {
    await db.query(
      `INSERT INTO users (email, username, password, firstname, lastname) VALUES ('${body.email}', '${body.username}', '${body.password}', '${body.firstname}', '${body.lastname}');`
    );
    const data = await db.query(
      `SELECT user_id FROM users WHERE username = '${body.username}' AND password = '${body.password}'`
    );
    res.status(200).json({ validation: true, data: data.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
