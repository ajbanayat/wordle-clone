import validWords from "../data/validWords.json" with { type: "json" };

const gameState = {
    answer: ""
};

const validWordsList = validWords as string[];

export function createGame() {
    const randomWord = 
        validWordsList[Math.floor(Math.random() * validWordsList.length)];

    gameState.answer = randomWord ?? "" 
    return gameState;
}