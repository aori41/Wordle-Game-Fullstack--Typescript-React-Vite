# Wordle Game 🟩⬜🟨

A Wordle-inspired game built with **TypeScript** on both the client and server sides. The game lets you guess English words, providing feedback like the original Wordle, and is currently playable in offline mode.

---

## 🚀 Features

- **Single-Player Gameplay**: Play Wordle offline, challenging yourself to guess the correct word.
- **Feedback Mechanism**: Color-coded hints:
  - 🟩 Green: Correct letter in the correct position.
  - 🟨 Yellow: Correct letter in the wrong position.
  - ⬜ Gray: Incorrect letter.
- **Extensive Word List**: Utilizes the full repository of English words from [dwyl/english-words](https://github.com/dwyl/english-words).
- **Responsive Design**: Enjoy seamless gameplay on both desktop and mobile devices.

---

## 📂 Project Structure

### Client
- **Tech Stack**: [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Folder**: `client/`
- **Description**: The frontend provides the game interface and handles user interactions.
- **Environment Variable**:
  - `VITE_URL`: The backend URL to connect to.

### Server
- **Tech Stack**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)
- **Folder**: `server/`
- **Description**: The backend processes game logic, validates words, and provides the word list.

---

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aori41/Wordle-Game-Fullstack--Typescript-React-Vite.git
    ```

2. **Setup the server**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup the client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
