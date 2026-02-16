import { useState } from "react";
import { bibleBooks } from "@/data/bibleBooks";
import BibleReader from "@/components/BibleReader";

export default function BiblePage() {
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  if (selectedBook && selectedChapter) {
    return (
      <div>
        <button
          onClick={() => setSelectedChapter(null)}
          className="p-4 text-sm text-accent"
        >
          ← Voltar aos capítulos
        </button>

        <BibleReader
          book={selectedBook.apiName}
          chapter={selectedChapter}
        />
      </div>
    );
  }

  if (selectedBook) {
    return (
      <div className="p-4">
        <button
          onClick={() => setSelectedBook(null)}
          className="mb-4 text-sm text-accent"
        >
          ← Voltar aos livros
        </button>

        <h2 className="text-lg font-bold mb-4">
          {selectedBook.name}
        </h2>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: selectedBook.chapters }, (_, i) => (
            <button
              key={i}
              onClick={() => setSelectedChapter(i + 1)}
              className="px-3 py-2 rounded bg-card border border-border text-sm"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">
        Bíblia Sagrada
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {bibleBooks.map((book) => (
          <button
            key={book.name}
            onClick={() => setSelectedBook(book)}
            className="p-4 rounded bg-card border border-border text-sm"
          >
            {book.name}
          </button>
        ))}
      </div>
    </div>
  );
}
