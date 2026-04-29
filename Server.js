const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "questions.json";

app.get("/questions", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

app.post("/add-question", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(FILE));
  questions.push(req.body);
  fs.writeFileSync(FILE, JSON.stringify(questions, null, 2));
  res.json({ message: "Added!" });
});

app.get("/", (req, res) => {
  res.send("Quiz Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log("Running"));
