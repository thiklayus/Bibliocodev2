export interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: Record<string, string>;
}

const FALLBACK_SUMMARIES: Record<
  number,
  { title: string; author: string; content: string }
> = {
  55752: {
    title: "Dom Casmurro",
    author: "Machado de Assis",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  },
  54829: {
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  },
  1497: {
    title: "A República",
    author: "Platão",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  },
  0: {
    title: "Meditações",
    author: "Marco Aurélio",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  },
  1: {
    title: "A Arte da Guerra",
    author: "Sun Tzu",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  },
  2: {
    title: "O Príncipe",
    author: "Nicolau Maquiavel",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  },
  3: {
    title: "Divina Comédia",
    author: "Dante Alighieri",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  },
  4: {
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    content: `📚 Este livro está passando por atualização de conteúdo.

Em breve disponibilizaremos a obra completa com capítulos organizados para melhor experiência de leitura.`
  }
};

export async function fetchBookContent(bookId: number): Promise<string> {
  const fallback = FALLBACK_SUMMARIES[bookId];

  if (fallback) {
    return `📖 ${fallback.title}\n✍️ ${fallback.author}\n\n─────────────────\n\n${fallback.content}`;
  }

  try {
    const res = await fetch(`https://gutendex.com/books/${bookId}/`);
    if (!res.ok) throw new Error("API error");

    const data: GutendexBook = await res.json();

    const textUrl =
      data.formats["text/plain; charset=utf-8"] ||
      data.formats["text/plain"] ||
      data.formats["text/html; charset=utf-8"] ||
      data.formats["text/html"];

    if (textUrl) {
      const textRes = await fetch(textUrl);
      if (textRes.ok) {
        return await textRes.text();
      }
    }

    throw new Error("No readable format");
  } catch {
    return "Conteúdo indisponível no momento. Tente novamente mais tarde.";
  }
}

export function getBookInfo(bookId: number) {
  const info: Record<
    number,
    { title: string; author: string; emoji: string }
  > = {
    55752: {
      title: "Dom Casmurro",
      author: "Machado de Assis",
      emoji: "📖"
    },
    54829: {
      title: "Memórias Póstumas de Brás Cubas",
      author: "Machado de Assis",
      emoji: "📜"
    },
    1497: {
      title: "A República",
      author: "Platão",
      emoji: "🏛️"
    },
    0: {
      title: "Meditações",
      author: "Marco Aurélio",
      emoji: "🧘"
    },
    1: {
      title: "A Arte da Guerra",
      author: "Sun Tzu",
      emoji: "⚔️"
    },
    2: {
      title: "O Príncipe",
      author: "Nicolau Maquiavel",
      emoji: "👑"
    },
    3: {
      title: "Divina Comédia",
      author: "Dante Alighieri",
      emoji: "🔥"
    },
    4: {
      title: "Orgulho e Preconceito",
      author: "Jane Austen",
      emoji: "💎"
    }
  };

  return (
    info[bookId] || {
      title: "Livro",
      author: "Autor desconhecido",
      emoji: "📚"
    }
  );
      }
