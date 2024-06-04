import { observer } from "mobx-react-lite";
import { data } from "../store/data";
import "../styles/EndGame.css";

export const EndGame: React.FC = observer(() => {
	const handleClick = () => {
		data.resetGame();
	}

	return <>
		<div className={`end-game ${data.winStatus ? "win" : "lose"}`}>
			<div>
				<h1 className="title">Game Over</h1>
				<h2 className={`subtitle ${data.winStatus ? "win" : "lose"}`}>You {data.winStatus ? "Won!" : "Lost!"}</h2>
			</div>
			<h3>The word was <span>{data.currentWord}</span></h3>
			<button onClick={handleClick}>New Game</button>
		</div >
	</>
});