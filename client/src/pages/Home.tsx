import { observer } from "mobx-react-lite";
import { data } from "../store/data";
import { url, lettersAmount } from "../meta/constants";
import axios from "axios";
import "../styles/Home.css";

export const Home: React.FC = observer(() => {
	const handleStartGame = async () => {
		try {
			await axios.post(`${url}/change-word`, { letterCount: lettersAmount });
			data.setGameStatus(true);
		} catch (err) {
			console.log(err);
		}
	}

	return <>
		<div className="home">
			<h1>Wordle</h1>
			<button className="start-game-btn" onClick={handleStartGame}>Start Game</button>
		</div>
	</>
});