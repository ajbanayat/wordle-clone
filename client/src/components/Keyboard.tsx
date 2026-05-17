function Keyboard() {
  const keyValues = [
    "QWERTYUIOP".split(""),
    " ASDFGHJKL ".split(""),
    "ZXCVBNM".split(""),
  ];

  keyValues[2].unshift("ENTER");
  keyValues[2].push("DELETE");
  return (
    <div className="keyboard">
      <KeyboardRow key={0} keyValues={keyValues[0]} />
      <KeyboardRow key={1} keyValues={keyValues[1]} />
      <KeyboardRow key={2} keyValues={keyValues[2]} />
    </div>
  );
}

function KeyboardRow({ keyValues }: { keyValues: string[] }) {
  return (
    <div className="keyboard-row">
      {keyValues.map((keyValue: string, index: number) => (
        <Key key={index} letter={keyValue} />
      ))}
    </div>
  );
}

function Key({ letter }: { letter: string }) {
  if (letter == " ") {
    return <div className="half-key"></div>;
  } else if (letter.length > 1) {
    return <div className="one-and-a-half-key">{letter}</div>;
  }

  return <button className="key">{letter}</button>;
}

export default Keyboard;
