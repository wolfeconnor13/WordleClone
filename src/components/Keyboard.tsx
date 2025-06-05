import { KEYBOARD_ROW1, KEYBOARD_ROW2, KEYBOARD_ROW3 } from "../lib/constants";
type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  // Fire a keypress for the delete button when the button is clicked
  return (
    <div>
      <div className="keyboard-row">
        {Object.values(KEYBOARD_ROW1).map((key) => (
          <button key={key} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {Object.values(KEYBOARD_ROW2).map((key) => (
          <button key={key} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {Object.values(KEYBOARD_ROW3).map((key) => (
          <button key={key} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
