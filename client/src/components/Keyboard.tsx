import { observer } from "mobx-react-lite";
import { data } from "../store/data";

type KeyboardProps = {
	onKeyPress: (key: string) => void;
}

const keys = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["Z", "X", "C", "V", "B", "N", "M", "DELETE"]
];

export const Keyboard: React.FC<KeyboardProps> = observer(({ onKeyPress }) => {
	return <>
		<div className="keyboard">
			{keys.map((row, rowIndex) => (
				<div key={rowIndex} className="row">
					{row.map((key) => (
						<button key={key} className={`key ${data.keyboardColors[key] ? data.keyboardColors[key] : ""}`} onClick={() => onKeyPress(key)}>
							{key}
						</button>
					))}
				</div>
			))}
			<button className="submit-button" onClick={() => onKeyPress("SUBMIT")}>
				SUBMIT
			</button>
		</div>
	</>
});