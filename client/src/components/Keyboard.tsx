import "./../assets/styles/Keyboard.css";

const Status = {
  INITIAL: "INITIAL", // empty
  TBD: "TBD", // typed but not entered
  ABSENT: "ABSENT", // not in final word
  PRESENT: "PRESENT", // in final word, but not in the correct position
  CORRECT: "CORRECT", // in the correct spot
} as const;

type Status = (typeof Status)[keyof typeof Status];

function Keyboard({
  keyStatuses,
  handleKeyInput,
}: {
  keyStatuses: {[key: string]: Status};
  handleKeyInput: (key: string) => void;
}) {
  const keyValues = [
    "QWERTYUIOP".split(""),
    " ASDFGHJKL ".split(""),
    "ZXCVBNM".split(""),
  ];

  const keyboardRows = [];
  for (let i = 0; i < keyValues.length; i++) {
    keyboardRows.push(
      <KeyboardRow
        key={i}
        keyValues={keyValues[i]}
        keyStatuses={keyStatuses}
        handleKeyInput={handleKeyInput}
      />,
    );
  }
  keyValues[2].unshift("ENTER");
  keyValues[2].push("DELETE");

  return <div className="keyboard">{keyboardRows}</div>;
}

function KeyboardRow({
  keyValues,
  keyStatuses,
  handleKeyInput,
}: {
  keyValues: string[];
  keyStatuses: {[key: string]: Status};
  handleKeyInput: (key: string) => void;
}) {
  return (
    <div className="keyboard-row">
      {keyValues.map((keyValue: string, index: number) => (
        <Key
          key={index}
          letter={keyValue}
          status={keyStatuses[keyValue.toLowerCase()]}
          handleKeyInput={handleKeyInput}
        />
      ))}
    </div>
  );
}

function Key({
  letter,
  status,
  handleKeyInput,
}: {
  letter: string;
  status: Status;
  handleKeyInput: (key: string) => void;
}) {
  let className = "key";
  if (letter == " ") {
    className = "half-key";
  } else if (letter.length > 1) {
    className = "one-and-a-half-key";
  }
  return (
    <button className={`${className} ${status}`} onClick={() => handleKeyInput(letter)}>
      {letter}
    </button>
  );
}

export default Keyboard;
