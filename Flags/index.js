import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "nikhiltomy",
  password: "test",
  host: "localhost",
  port: 5432,
  database: "world_capital_quiz"
});

db.connect();

const quiz = [];
db.query("SELECT country,flags FROM flags", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    result.rows.forEach((row) => {
      quiz.push(row);
    });
    console.log("Quiz data:", quiz); // Log the quiz data to verify
  }
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log("Current question:", currentQuestion); // Log the current question
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital && typeof currentQuestion.capital.toLowerCase === 'function' && currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = {
    country: randomCountry.country,
    capital: randomCountry.capital, // Ensure this matches your database field
    flag: randomCountry.flags // Ensure this matches your database field
  };
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});