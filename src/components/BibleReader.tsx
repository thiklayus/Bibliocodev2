import { useEffect, useMemo, useState } from "react";
import PageTurner from "@/components/PageTurner";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { getChapter } from "@/services/bibleService";

type Verse = {
  verse: number;
  text: string;
};

const LS_KEY = "bibliocode_favs";

export default function BibleReader({
  book,
  chapter,
  bookLabel,
}: {
  book: string;
  chapter: number;
  bookLabel?: string;
}) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [favs, setFavs] = useState<Record<string, true>>(
    JSON.parse(localStorage.getItem(LS_KEY) || "{}")
  );

  useEffect(() => {
    async function load() {
      const data = await getChapter(book, chapter);
      setVerses(data);
      setPageIndex(0);
    }
    load();
  }, [book, chapter]);

  const toggleFav = (v: number) => {
    const key = `${book}:${chapter}:${v}`;
    const next = { ...favs };
    if (next[key]) delete next[key];
    else next[key] = true;
    setFavs(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  };

  const versesPerPage = 14;

  const pages = useMemo(() => {
    const result: Verse[][] = [];
    for (let i = 0; i < verses.length; i += versesPerPage) {
      result.push(verses.slice(i, i + versesPerPage));
    }
    return result;
  }, [verses]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <PageTurner
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        totalPages={pages.length || 1}
        renderPage={(idx) => (
          <div className="bookPage">
            <div className="mb-4 text-xs text-muted-foreground">
              {bookLabel} {chapter}
            </div>

            {pages[idx]?.map((v) => {
              const fav = favs[`${book}:${chapter}:${v.verse}`];
              return (
                <div key={v.verse} className="verseRow">
                  <button
                    onClick={() => toggleFav(v.verse)}
                    className="mr-2"
                  >
                    {fav ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>

                  <p>
                    <span className="verseNum">{v.verse}</span>
                    {v.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      />
    </div>
  );
         }
