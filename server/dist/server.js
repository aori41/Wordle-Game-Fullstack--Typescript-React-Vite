import "dotenv/config";
import express from 'express';
import cors from "cors";
import { isActualWord, getRandWord } from "./modules/words.js";
const app = express();
const port = process.env.port || 5000;
app.use(express.json());
app.use(cors());
let currentWord = "";
app.get("/word", (_req, res) => {
    res.json({ word: currentWord });
});
app.post("/change-word", (req, res) => {
    const { letterCount } = req.body;
    currentWord = getRandWord(letterCount);
    console.log(currentWord);
    res.end();
});
app.post("/check-word", (req, res) => {
    const { word } = req.body;
    const positions = new Array(word.length).fill("gray");
    const letterCount = {};
    for (let i = 0; i < currentWord.length; i++) {
        const currentLetter = currentWord[i];
        if (currentLetter === word[i]) {
            positions[i] = "green";
        }
        else {
            letterCount[currentLetter] = (letterCount[currentLetter] || 0) + 1;
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (positions[i] === "gray" && letterCount[word[i]]) {
            positions[i] = "yellow";
            letterCount[word[i]]--;
        }
    }
    res.json({ positions });
});
app.post("/is-word", (req, res) => {
    const { word } = req.body;
    res.json({ isWord: isActualWord(word) });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
