import { useEffect, useState } from "react";
import { getChapter } from "@/services/bibleService";

interface Props {
  book: string;
  chapter: number;
}

export default function BibleReader({ book, chapter }: Props) {
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChapter() {
      setLoading(true);
      const data = await getChapter(book, chapter);
      setVerses(data);
      setLoading(false);
      window.scrollTo(0, 0);
    }

    fetchChapter();
  }, [book, chapter]);

  if (loading) {
    return <p className="text-center mt-6">Carregando capítulo...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {verses.map((verse) => (
        <p key={verse.verse} className="mb-2 leading-relaxed">
          <span className="text-xs align-super mr-1 text-muted-foreground">
            {verse.verse}
          </span>
          {verse.text}
        </p>
      ))}
    </div>
  );
}
