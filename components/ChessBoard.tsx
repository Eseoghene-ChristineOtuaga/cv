// A decorative board: an 8x8 grid with a mid-game position in Unicode glyphs.
const position: Record<string, string> = {
  a8: "♜", e8: "♚", f8: "♜", b7: "♟", f7: "♟", g7: "♟", h7: "♟", c6: "♞", a7: "♟", d5: "♟", e6: "♝",
  e4: "♙", d4: "♙", f3: "♘", c4: "♗", a2: "♙", b2: "♙", f2: "♙", g2: "♙", h2: "♙", d1: "♕", e1: "♔", h1: "♖", a1: "♖",
};

const files = "abcdefgh";

export default function ChessBoard() {
  const squares = [];
  for (let rank = 8; rank >= 1; rank--) {
    for (let f = 0; f < 8; f++) {
      const sq = `${files[f]}${rank}`;
      const dark = (f + rank) % 2 === 1;
      const piece = position[sq];
      const white = piece ? "♔♕♖♗♘♙".includes(piece) : false;
      squares.push(
        <div key={sq} className={`sq ${dark ? "sq-dark" : "sq-light"}`}>
          {piece && <span className={`piece ${white ? "piece-white" : "piece-black"}`}>{piece}</span>}
        </div>
      );
    }
  }
  return (
    <div className="chess-board" role="img" aria-label="A chess board in the middle of a game">
      {squares}
    </div>
  );
}
