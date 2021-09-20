const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config();

const app = express();
app.use(cors());

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

app.get("/verbs/:mood/:tense/:verbEnding", async (req, res) => {
  const tense = req.params.tense.split(" ").join("_");
  if (
    req.params.mood === "infinito" ||
    req.params.mood === "participio" ||
    req.params.mood === "gerundio"
  ) {
    try {
      const verbs = await pool.query(
        `SELECT verbs.verb, conjugations_nonfinite.${req.params.mood}_${tense} as conjugation 
        FROM conjugations_nonfinite 
        JOIN verbs ON verb_id = verbs.id
        WHERE verbs.verb_ending = '${req.params.verbEnding}'
        ORDER BY random() LIMIT 50`
      );
      res.json(verbs.rows);
    } catch (err) {
      console.log(err.message);
    }
  } else if (req.params.mood === "imperativo") {
    try {
      const verbs =
        await pool.query(`SELECT verbs.verb,  subject_pronouns.pronoun as subject, conjugations_finite.imperativo_${tense} as conjugation 
    FROM conjugations_finite 
    JOIN subject_pronouns ON subject_id = subject_pronouns.id
    JOIN verbs ON verb_id = verbs.id
    WHERE verbs.verb_ending = '${req.params.verbEnding}'
    AND conjugations_finite.imperativo_${tense} IS NOT NULL
    ORDER BY random() LIMIT 50`);
      res.json(verbs.rows);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      const verbs = await pool.query(
        `SELECT verbs.verb, subject_pronouns.pronoun as subject, conjugations_finite.${req.params.mood}_${tense} as conjugation 
        FROM conjugations_finite 
        JOIN subject_pronouns ON subject_id = subject_pronouns.id
        JOIN verbs ON verb_id = verbs.id
        WHERE verbs.verb_ending = '${req.params.verbEnding}'
        ORDER BY random() LIMIT 50`
      );
      res.json(verbs.rows);
    } catch (err) {
      console.log(err.message);
    }
  }
});

app.get("/verbs/:mood/:tense", async (req, res) => {
  const tense = req.params.tense.split(" ").join("_");
  if (
    req.params.mood === "infinito" ||
    req.params.mood === "participio" ||
    req.params.mood === "gerundio"
  ) {
    try {
      const verbs = await pool.query(
        `SELECT verbs.verb, conjugations_nonfinite.${req.params.mood}_${tense} as conjugation 
          FROM conjugations_nonfinite
          JOIN verbs ON verb_id = verbs.id
          ORDER BY random() LIMIT 50`
      );
      res.json(verbs.rows);
    } catch (err) {
      console.log(err.message);
    }
  } else if (req.params.mood === "imperativo") {
    try {
      const verbs =
        await pool.query(`SELECT verbs.verb, subject_pronouns.pronoun as subject, conjugations_finite.imperativo_${tense} as conjugation 
    FROM conjugations_finite 
    JOIN subject_pronouns ON subject_id = subject_pronouns.id
    JOIN verbs ON verb_id = verbs.id
    WHERE conjugations_finite.imperativo_${tense} IS NOT NULL
    ORDER BY random() LIMIT 50`);
      res.json(verbs.rows);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      const verbs = await pool.query(
        `SELECT verbs.verb, subject_pronouns.pronoun as subject, conjugations_finite.${req.params.mood}_${tense} as conjugation 
          FROM conjugations_finite 
          JOIN subject_pronouns ON subject_id = subject_pronouns.id
          JOIN verbs ON verb_id = verbs.id
          ORDER BY random() LIMIT 50`
      );
      res.json(verbs.rows);
    } catch (err) {
      console.log(err.message);
    }
  }
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on ${port}`));
