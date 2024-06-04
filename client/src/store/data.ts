import { makeAutoObservable } from "mobx";
import { maxGuesses } from "../meta/constants";

class Data {
	private timeouts: Map<string, number | NodeJS.Timeout> = new Map();

	public startGame = false;
	public invalidWord = false;

	public winStatus: boolean | undefined = undefined;

	public currentWord = "";

	public lineId = 0;

	public keyboardColors: Record<string, string> = {};
	public letters: Array<Array<{ letter: string; color: string, animate: boolean }>> = Array.from({ length: maxGuesses }, () => []);

	constructor() {
		makeAutoObservable(this);
	}

	resetGame() {
		this.startGame = false;
		this.invalidWord = false;

		this.winStatus = undefined;

		this.currentWord = "";

		this.lineId = 0;

		this.keyboardColors = {};
		this.letters = Array.from({ length: maxGuesses }, () => []);
	}

	resetWord(line: number) {
		this.letters[line] = [];
	}

	setKeyboardColor(keys: string, colors: string[]) {
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (this.keyboardColors[key] === "green" || (this.keyboardColors[key] === "yellow" && colors[i] !== "green")) continue;

			this.keyboardColors[key] = colors[i];
		}
	}

	setGameStatus(status: boolean) {
		this.startGame = status;
	}

	setWinStatus(status: boolean | undefined) {
		this.winStatus = status;
	}

	incrementLineId() {
		this.lineId++;
	}

	changeCurrentWord(word: string) {
		this.currentWord = word;
	}

	addLetterObj(line: number, letter: string, color: string, animate: boolean) {
		this.letters[line].push({ letter, color, animate });

		const lastIndex = this.letters[line].length;
		const timeoutId = setTimeout(() => {
			this.removeLetterAnimation(line, lastIndex - 1);
		}, 300);

		this.timeouts.set(`${line}-${lastIndex - 1}`, timeoutId);
	}

	private removeLetterAnimation(line: number, letterIndex: number) {
		if (this.letters[line] && this.letters[line][letterIndex]) {
			this.letters[line][letterIndex].animate = false;

			this.timeouts.delete(`${line}-${letterIndex}`);
		}
	}

	removeLetterObj(line: number) {
		const lastIndex = this.letters[line].length - 1;
		const timeoutKey = `${line}-${lastIndex}`;

		if (this.timeouts.has(timeoutKey)) {
			clearTimeout(this.timeouts.get(timeoutKey));
			this.timeouts.delete(timeoutKey);
		}
		this.letters[line].pop();
	}

	changeLettersColor(line: number, colors: string[]) {
		this.letters[line].map((obj, i) => obj.color = colors[i]);
	}

	setInvalidWord(status: boolean) {
		this.invalidWord = status;
	}
}

export const data = new Data();