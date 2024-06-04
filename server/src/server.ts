import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { isActualWord, getRandWord } from "./modules/words.js";

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

let currentWord = "";

app.get("/word", (_req: Request, res: Response) => {
	res.json({ word: currentWord });
});

app.post("/change-word", (req: Request, res: Response) => {
	const { letterCount } = req.body;

	currentWord = getRandWord(letterCount);

	res.end();
});

app.post("/check-word", (req: Request, res: Response) => {
	const { word } = req.body;

	const positions = new Array(word.length).fill("gray");
	const letterCount: Record<string, number> = {};

	for (let i = 0; i < currentWord.length; i++) {
		const currentLetter = currentWord[i];

		if (currentLetter === word[i]) {
			positions[i] = "green";
		} else {
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

app.post("/is-word", (req: Request, res: Response) => {
	const { word } = req.body;

	res.json({ isWord: isActualWord(word) });
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});