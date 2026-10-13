import type { Metadata } from "next";
import ChessBoard from "@/components/ChessBoard";
import ChessQuiz from "@/components/ChessQuiz";
import { chessProfile } from "@/lib/data";

export const metadata: Metadata = { title: "Chess" };

export default function ChessPage() {
  return (
    <section id="chess" className="section">
      <div className="container">
        <h1 className="section-title">Chess Corner</h1>

        <div className="chess-content">
          <ChessBoard />
          <ChessQuiz />

          <div className="chess-invite fade-in">
            <h2>Let&apos;s Play a Game</h2>
            <p>Challenge me on Chess.com — I&apos;m always looking for new opponents.</p>
            <a href={chessProfile} className="btn" target="_blank" rel="noopener noreferrer">
              Play on Chess.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
