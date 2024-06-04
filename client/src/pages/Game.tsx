import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { data } from "../store/data";
import { Board } from "../components/Board";
import { Keyboard } from "../components/Keyboard";
import { url, lettersAmount, maxGuesses } from "../meta/constants";
import axios from "axios";
import "../styles/Game.css";

export const Game = observer(() => {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		handleBlur();
	}, []);

	const handleBlur = (): void => {
		divRef.current?.focus();
	};

	const handleKeyPress = (key: string) => {
		if (data.winStatus !== undefined) return;

		if (/^[a-zA-Z]$/.test(key)) {
			if (data.letters[data.lineId].length < lettersAmount) {
				data.addLetterObj(data.lineId, key.toUpperCase(), "", true);
			}
		} else if (key === "Backspace" || key === "DELETE") {
			data.removeLetterObj(data.lineId);
		} else if (key === "Enter" || key === "SUBMIT") {
			handleSubmit();
		}
	};

	const updateWord = async () => {
		const res = await axios.get(`${url}/word`);

		data.changeCurrentWord(res.data.word);
	}

	const handleSubmit = async () => {
		if (data.winStatus !== undefined) return;

		const word = data.letters[data.lineId].map(obj => obj.letter.toLowerCase()).join("");

		if (word.length < lettersAmount) return;

		if (data.letters[data.lineId].length === lettersAmount && data.lineId < maxGuesses) {
			const res = await axios.post(`${url}/is-word`, { word });

			if (res.data.isWord) {
				const res = await axios.post(`${url}/check-word`, { word });

				data.changeLettersColor(data.lineId, res.data.positions);

				data.setKeyboardColor(word.toUpperCase(), res.data.positions);

				if (res.data.positions.every((color: string) => color === "green")) {
					await updateWord();
					return data.setWinStatus(true);
				}
				data.incrementLineId();

				if (data.lineId === maxGuesses) {
					await updateWord();
					return data.setWinStatus(false);
				}
			}
			else {
				data.resetWord(data.lineId);
				setLineAnimation();
			}
		} else setLineAnimation();
	}

	const setLineAnimation = () => {
		if (data.invalidWord) return;

		data.setInvalidWord(true);

		setTimeout(() => {
			data.setInvalidWord(false);
		}, 350);
	}

	return <>
		<div className="game" ref={divRef} tabIndex={0} onKeyDown={(e) => handleKeyPress(e.key)} onBlur={handleBlur}>
			<h1>Wordle</h1>
			<Board maxRows={maxGuesses} squaresInLine={lettersAmount} />
		</div>
		<Keyboard onKeyPress={handleKeyPress} />
	</>
});