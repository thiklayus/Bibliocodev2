import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import BibleReader from "@/components/BibleReader";

const BOOKS = [
  { name: "João", api: "john", chapters: 21 },
  { name: "Salmos", api: "psalms", chapters: 150 },
  { name: "Gênesis", api: "genesis", chapters: 50 },
];

export default function BiblePage() {
  const navigate = useNavigate();
  const [book, setBook] = useState(BOOKS[0]);
  const [chapter, setChapter] = useState(1);

  return (
    <div className="min-h-screen pb-24">

      <header className="sticky top-0 bg-background border-b p-4 z-40">
        <div className="flex justify-between mb-3">
          <button onClick={() => navigate(-1)}>← Voltar</button>
          <select
            value={book.api}
            onChange={(e) => {
              const selected = BOOKS.find(b => b.api === e.target.value)!;
              setBook(selected);
              setChapter(1);
            }}
          >
            {BOOKS.map(b => (
              <option key={b.api} value={b.api}>
                {b.name}
              </option>
            ))}
          </select>
          <button onClick={() => navigate("/")}>Início</button>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: book.chapters }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setChapter(n)}
              className={`text-xs px-2 py-1 border rounded ${
                chapter === n ? "bg-accent text-white" : ""
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </header>

      <BibleReader
        book={book.api}
        chapter={chapter}
        bookLabel={book.name}
      />

      <BottomNav />
    </div>
  );
}
