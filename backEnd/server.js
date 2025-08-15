require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');

const userRoutes = require("./routes/userRoutes");
const pitchRoutes = require("./routes/pitchRoutes");
const userInfoRoutes = require("./routes/userInfoRoutes");
const investorInfoRoutes = require("./routes/investorInfoRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});



(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to RAILWAY MySQL");
    conn.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();


app.use("/user", userRoutes);
app.use("/pitches", pitchRoutes);
app.use("/profile", userInfoRoutes);
app.use("/investor-info", investorInfoRoutes);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
