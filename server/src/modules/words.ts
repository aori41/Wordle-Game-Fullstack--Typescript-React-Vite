import { readFileSync } from "fs";

const wordsFile = readFileSync("words_alpha.txt", "utf-8").split("\r\n");
const wordTree = JSON.parse(readFileSync("wordtree.json", "utf-8"));

export function getRandWord(letterCount: number) {
	const words = wordsFile.filter(word => word.length === letterCount);

	return words[Math.floor(Math.random() * words.length)];
}

export function isActualWord(word: string) {
	let tree = wordTree;

	for (let i = 0; i < word.length; i++) {
		if (!tree[word[i]]) return false;

		tree = tree[word[i]];
	}
	return tree?.word;
}