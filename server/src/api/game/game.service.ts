import validWords from "../data/validWords.json" with { type: "json" };
import { Status } from "../../../../shared/status.js";

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

export function processResult(guess: string) {
    // example: crane
    const answer = gameState.answer;

    // input example: board
    // need to look at each letter and determine if it's correct, present, or absent
    // should we use a dict where the value is the count and indices?
    // or should we just loop through the answer and check for matches?
    // what happens if you have two of the same letter in the answer and one in the guess?

    // Grab all correct letters first, then look at the remaining letters and add them to dict
    const results: (typeof Status)[keyof typeof Status][] = [];
    const remaining: Record<string, number> = {};
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) {
            results[i] = Status.CORRECT;
        }
        else {
            const letter = answer[i];
            if(letter){
                remaining[letter] = (remaining[letter] ?? 0) + 1;
            }
        }
    }

    // WIP: Now check for present and absent letters in the dict
    for (let i = 0; i < guess.length; i++) {
        if(results[i] === Status.CORRECT){
            continue;
        }

    }

    return {
        guess,
        processed: true,
    };
}