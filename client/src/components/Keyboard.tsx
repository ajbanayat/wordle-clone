import './../assets/styles/Keyboard.css';

function Keyboard({ handleKeyInput }: { handleKeyInput: (key: string) => void }) {
  const keyValues = [
    "QWERTYUIOP".split(""),
    " ASDFGHJKL ".split(""),
    "ZXCVBNM".split(""),
  ];

  keyValues[2].unshift("ENTER");
  keyValues[2].push("DELETE");
  return (
    <div className="keyboard">
      <KeyboardRow key={0} keyValues={keyValues[0]} handleKeyInput={handleKeyInput} />
      <KeyboardRow key={1} keyValues={keyValues[1]} handleKeyInput={handleKeyInput} />
      <KeyboardRow key={2} keyValues={keyValues[2]} handleKeyInput={handleKeyInput} />
    </div>
  );
}

function KeyboardRow({ keyValues, handleKeyInput }: { keyValues: string[], handleKeyInput: (key: string) => void }) {
  return (
    <div className="keyboard-row">
      {keyValues.map((keyValue: string, index: number) => (
        <Key key={index} letter={keyValue} handleKeyInput={handleKeyInput} />
      ))}
    </div>
  );
}

function Key({ letter, handleKeyInput }: { letter: string, handleKeyInput: (key: string) => void  }) {
  let className = "key";
  if (letter == " ") {
    className = "half-key";
  } else if (letter.length > 1) {
    className = "one-and-a-half-key";
  }
  return <button className={className} onClick={() => handleKeyInput(letter)} >{letter}</button>;
}

export default Keyboard;
