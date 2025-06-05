type RowProps = {
  currentGuess?: string[];
};

export default function Row({ currentGuess }: RowProps) {
  return (
    <div className="row">
      {currentGuess?.map((letter, index) => (
        <span key={index} className={`letter ${letter ? "filled" : ""}`}>
          {letter}
        </span>
      ))}
    </div>
  );
}
