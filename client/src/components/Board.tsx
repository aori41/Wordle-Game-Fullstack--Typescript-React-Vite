import { observer } from "mobx-react-lite";
import { data } from "../store/data";

type LineProps = {
	maxRows: number;
	squaresInLine: number;
};

export const Board: React.FC<LineProps> = observer(({ maxRows, squaresInLine }) => {
	return <>
		<div className="board">
			{Array.from({ length: maxRows }).map((_, i) => (
				<div className={`line ${data.invalidWord && i === data.lineId ? "invalid" : ""}`} key={i}>
					{Array.from({ length: squaresInLine }).map((_, j) => (
						<div className={`square ${data.letters[i]?.[j]?.color || ""} ${data.letters[i]?.[j]?.animate ? "animate" : ""}`} key={j}>
							{data.letters[i]?.[j]?.letter}
						</div>
					))}
				</div>
			))}
		</div>
	</>
});
