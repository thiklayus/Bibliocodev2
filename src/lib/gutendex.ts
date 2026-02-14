export interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: Record<string, string>;
}

const FALLBACK_SUMMARIES: Record<number, { title: string; author: string; content: string }> = {
  55752: {
    title: "Dom Casmurro",
    author: "Machado de Assis",
    content: `Dom Casmurro é um dos mais célebres romances da literatura brasileira, escrito por Machado de Assis e publicado em 1899. A narrativa é contada em primeira pessoa por Bento Santiago, apelidado de "Dom Casmurro", que relata sua vida desde a juventude no bairro de Matacavalos, no Rio de Janeiro.

A trama central gira em torno do amor entre Bentinho e Capitu, sua vizinha de infância. Apesar da promessa feita pela mãe de Bentinho de torná-lo padre, os dois conseguem se casar. No entanto, com o passar dos anos, Bentinho é consumido por um ciúme obsessivo, convencendo-se de que Capitu o traiu com seu melhor amigo, Escobar.

A genialidade de Machado de Assis reside na ambiguidade narrativa: nunca sabemos ao certo se a traição realmente aconteceu ou se tudo não passa da imaginação doentia de um narrador não confiável. A obra questiona os limites da verdade, da memória e da percepção, tornando-se um marco do Realismo brasileiro.

O romance explora temas como ciúme, traição, aparência versus essência, e a fragilidade das relações humanas, tudo isso com a ironia fina e a prosa elegante que caracterizam Machado de Assis.`
  },
  54829: {
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    content: `Memórias Póstumas de Brás Cubas, publicado em 1881, é considerado o marco inaugural do Realismo no Brasil. Nesta obra revolucionária, Machado de Assis rompe com todas as convenções literárias da época ao apresentar um narrador defunto — Brás Cubas conta sua história depois de morto.

O "defunto autor" narra sua vida de forma não-linear, saltando entre episódios de sua existência privilegiada como filho da elite carioca do século XIX. Brás Cubas não poupa ninguém de sua ironia mordaz: nem a si mesmo, nem à sociedade hipócrita que o cercava.

Entre amores frustrados (como o caso com Virgília), empreendimentos fracassados e reflexões filosóficas, Brás Cubas revela a vaidade e o egoísmo que permearam sua vida inteira. Sua maior "invenção" — o emplasto Brás Cubas, um remédio contra a melancolia — simboliza a futilidade de suas ambições.

A obra é notável por seu pessimismo elegante, seus capítulos curtíssimos (alguns com apenas uma frase), e por diálogos diretos com o leitor. Machado cria uma narrativa que mistura humor negro, filosofia e crítica social com maestria incomparável.

O romance termina com o célebre "capítulo das negativas", onde Brás Cubas faz o balanço de sua vida e conclui que não teve filhos, não transmitiu a nenhuma criatura o legado da miséria humana — considerando isso seu único saldo positivo.`
  },
  1497: {
    title: "A República",
    author: "Platão",
    content: `A República (em grego: Πολιτεία, Politeia) é uma das obras mais influentes da história da filosofia ocidental, escrita por Platão por volta de 380 a.C. O diálogo é protagonizado por Sócrates, que discute com diversos interlocutores sobre a natureza da justiça e a organização ideal de uma cidade-estado.

A obra está dividida em dez livros e aborda temas fundamentais como: O que é a justiça? É melhor ser justo ou injusto? Como deve ser organizada uma sociedade ideal?

Platão, através de Sócrates, propõe uma cidade ideal governada por filósofos-reis — pessoas que, através do conhecimento e da sabedoria, seriam os mais aptos a conduzir a sociedade ao bem comum. A educação ocupa papel central nessa visão, sendo o instrumento para formar cidadãos virtuosos.

Uma das passagens mais célebres é a Alegoria da Caverna (Livro VII), onde Platão ilustra a condição humana: prisioneiros acorrentados numa caverna veem apenas sombras projetadas na parede e as tomam como realidade. Aquele que se liberta e vê a luz do sol representa o filósofo que alcança o conhecimento verdadeiro.

A República também discute a teoria das Formas (ou Ideias), a divisão da alma em três partes (razão, espírito e apetite), a crítica à democracia e à tirania, e a famosa analogia da Linha Dividida que hierarquiza os níveis de conhecimento.

A obra permanece essencial para o pensamento político, ético e educacional até os dias de hoje.`
  }
};

export async function fetchBookContent(bookId: number): Promise<string> {
  try {
    // Try Gutendex API with Portuguese filter
    const res = await fetch(`https://gutendex.com/books/${bookId}/`);
    if (!res.ok) throw new Error('API error');
    const data: GutendexBook = await res.json();
    
    // Try to get text content
    const textUrl = data.formats['text/plain; charset=utf-8'] 
      || data.formats['text/plain'] 
      || data.formats['text/html; charset=utf-8']
      || data.formats['text/html'];
    
    if (textUrl) {
      const textRes = await fetch(textUrl);
      if (textRes.ok) {
        const text = await textRes.text();
        // Check if it's in Portuguese (simple heuristic)
        const ptIndicators = ['que', 'não', 'uma', 'com', 'para', 'como', 'mais', 'foi'];
        const words = text.toLowerCase().split(/\s+/).slice(0, 200);
        const ptCount = ptIndicators.filter(w => words.includes(w)).length;
        if (ptCount >= 3) {
          return text;
        }
      }
    }
    throw new Error('Content not in Portuguese');
  } catch {
    // Fallback to summary
    const fallback = FALLBACK_SUMMARIES[bookId];
    if (fallback) {
      return `📖 ${fallback.title}\n✍️ ${fallback.author}\n\n─────────────────\n\n${fallback.content}`;
    }
    return 'Conteúdo indisponível no momento. Tente novamente mais tarde.';
  }
}

export function getBookInfo(bookId: number) {
  const info: Record<number, { title: string; author: string; emoji: string }> = {
    55752: { title: "Dom Casmurro", author: "Machado de Assis", emoji: "📖" },
    54829: { title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", emoji: "📜" },
    1497: { title: "A República", author: "Platão", emoji: "🏛️" },
  };
  return info[bookId] || { title: "Livro", author: "Autor desconhecido", emoji: "📚" };
}
