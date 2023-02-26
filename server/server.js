import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import db from "./db.js";

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
      `SELECT user_id, firstname, password FROM users WHERE username = '${body.username}'`
    );
    // Validate user data
    if (data.rows.length !== 0) {
      const match = await bcrypt.compare(body.password, data.rows[0].password);
      if (match) {
        // Validate a shopping cart that is within 2 weeks time from the current date
        const cartData = await db.query(
          `SELECT cart_id, date, products FROM carts WHERE user_id = ${data.rows[0].user_id}`
        );
        // Check if a shopping cart exists for user
        if (cartData.rows.length !== 0) {
          const currentDate = Date.now();
          const shoppingCartDate = Date.parse(cartData.rows[0].date);
          const expirationTwoWeeks = 1209600000;
          // Checks whether cart is outside 2 week expiration
          if (shoppingCartDate > currentDate - expirationTwoWeeks) {
            res.status(200).json({
              validation: true,
              data: data.rows,
              cartData: cartData.rows[0].products,
            });
          } else {
            // Cart is expired, will delete that cart_id and create a new cart with a current time stamp
            await db.query(
              `DELETE FROM carts WHERE cart_id = ${cartData.rows[0].cart_id}`
            );
            const currentDate = new Date().toISOString();
            await db.query(
              `INSERT INTO carts (user_id, date, products) VALUES (${data.rows[0].user_id}, '${currentDate}', '[]')`
            );
            res
              .status(200)
              .json({ validation: true, data: data.rows, cartData: [] });
          }
        } else {
          // No cart exists, will create a cart with a current time stamp
          const currentDate = new Date().toISOString();
          await db.query(
            `INSERT INTO carts (user_id, date, products) VALUES (${data.rows[0].user_id}, '${currentDate}', '[]')`
          );
          res
            .status(200)
            .json({ validation: true, data: data.rows, cartData: [] });
        }
      } else {
        res
          .status(401)
          .json({ validation: false, message: "Invalid password" });
      }
    } else {
      res.status(404).json({ validation: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.route("/users/signup").post(async (req, res) => {
  const { body } = req;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    await db.query(
      `INSERT INTO users (email, username, password, firstname, lastname) VALUES ('${body.email}', '${body.username}', '${hashedPassword}', '${body.firstname}', '${body.lastname}');`
    );
    const data = await db.query(
      `SELECT user_id, firstname FROM users WHERE username = '${body.username}'`
    );
    // No cart exists, will create a cart with a current time stamp
    const currentDate = new Date().toISOString();
    await db.query(
      `INSERT INTO carts (user_id, date, products) VALUES (${data.rows[0].user_id}, '${currentDate}', '[]')`
    );
    res.status(200).json({ validation: true, data: data.rows, cartData: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.route("/cart/update").patch(async (req, res) => {
  const { body } = req;
  try {
    const newProduct = JSON.stringify(body.cartData);
    await db.query(
      `UPDATE carts SET products = '${newProduct}' WHERE user_id = ${body.userData.user_id}`
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
