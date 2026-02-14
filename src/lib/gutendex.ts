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
  },
  // Meditações — Marco Aurélio
  0: {
    title: "Meditações",
    author: "Marco Aurélio",
    content: `Meditações (em grego: Τὰ εἰς ἑαυτόν) é uma série de escritos pessoais do imperador romano Marco Aurélio, redigidos entre 161 e 180 d.C., durante campanhas militares e reflexões noturnas.

Não foram escritos para publicação. São anotações íntimas de um homem que governava o maior império do mundo e, ainda assim, buscava disciplina interior acima de tudo. Marco Aurélio segue a escola estoica, que ensina a aceitar o que não se pode controlar e a focar apenas no que depende de nós: nossas ações e nosso caráter.

Os temas centrais incluem: a impermanência de todas as coisas, o dever moral, a autodisciplina, a serenidade diante do sofrimento e a importância de viver de acordo com a razão e a natureza.

Trechos como "A felicidade da tua vida depende da qualidade dos teus pensamentos" e "Não desperdiça o que resta da tua vida imaginando o que os outros fazem" tornaram-se pilares da filosofia prática.

Meditações é considerada uma das obras fundamentais do estoicismo e uma das mais profundas reflexões sobre a condição humana já escritas. Sua relevância permanece intacta após quase dois milênios.`
  },
  // A Arte da Guerra — Sun Tzu
  1: {
    title: "A Arte da Guerra",
    author: "Sun Tzu",
    content: `A Arte da Guerra (em chinês: 孫子兵法, Sūnzǐ Bīngfǎ) é um tratado militar escrito por Sun Tzu, general e estrategista chinês, por volta do século V a.C. É considerado o mais antigo e influente manual de estratégia do mundo.

Dividido em treze capítulos, o texto aborda desde o planejamento e a avaliação de forças até o uso do espionagem e do terreno como armas. Cada capítulo oferece princípios que transcendem o campo de batalha e se aplicam a negócios, liderança e vida pessoal.

Princípios fundamentais incluem: "A suprema arte da guerra é subjugar o inimigo sem lutar", "Conheça o inimigo e conheça a si mesmo; em cem batalhas, nunca será derrotado" e "Toda guerra é baseada no engano".

Sun Tzu enfatiza a importância da preparação, da adaptabilidade, do conhecimento do terreno e do adversário. Para ele, a vitória ideal é aquela alcançada pela estratégia e pela inteligência, não pela força bruta.

A obra influenciou líderes militares como Napoleão e Mao Tsé-tung, e hoje é leitura obrigatória em escolas de negócios, cursos de liderança e academias militares ao redor do mundo.`
  },
  // O Príncipe — Maquiavel
  2: {
    title: "O Príncipe",
    author: "Nicolau Maquiavel",
    content: `O Príncipe (em italiano: Il Principe) é um tratado político escrito por Nicolau Maquiavel em 1513 e publicado postumamente em 1532. A obra é dedicada a Lourenço de Médici e analisa como um governante pode adquirir e manter o poder político.

Maquiavel rompe com a tradição filosófica idealista ao tratar a política como ela é, e não como deveria ser. Sua abordagem pragmática chocou a Europa ao sugerir que um príncipe deve estar disposto a agir de forma imoral quando necessário para preservar o Estado.

Conceitos centrais incluem: a distinção entre ser amado e ser temido ("é mais seguro ser temido do que amado, quando se tem que escolher entre ambos"), a virtù (capacidade de ação decisiva) e a fortuna (as circunstâncias imprevisíveis da vida política).

A obra analisa diferentes tipos de principados, o papel dos exércitos, a importância de manter as aparências e como lidar com conselheiros e aduladores. Maquiavel utiliza exemplos históricos da Roma antiga e da Itália renascentista para ilustrar seus argumentos.

O Príncipe é considerado o texto fundador da ciência política moderna e continua sendo uma das obras mais debatidas e influentes da história do pensamento ocidental.`
  },
  // Divina Comédia — Dante
  3: {
    title: "Divina Comédia",
    author: "Dante Alighieri",
    content: `A Divina Comédia (em italiano: Divina Commedia) é um poema épico escrito por Dante Alighieri entre 1308 e 1321. É considerada uma das maiores obras da literatura mundial e o texto fundador da língua italiana moderna.

O poema narra a jornada de Dante através dos três reinos do além-vida: Inferno, Purgatório e Paraíso. No Inferno, Dante é guiado pelo poeta romano Virgílio através dos nove círculos, onde pecadores sofrem punições proporcionais aos seus pecados — o chamado "contrapasso".

No Purgatório, a montanha de sete terraços representa a purificação gradual da alma. No Paraíso, Dante é conduzido por Beatriz — sua musa e símbolo do amor divino — através das esferas celestiais até a visão de Deus.

A obra é uma síntese monumental da cultura medieval: teologia, filosofia, ciência, política e poesia se entrelaçam numa estrutura matemática perfeita (três cânticas de 33 cantos cada, mais um canto introdutório, totalizando 100 cantos em terza rima).

A Divina Comédia transcende seu tempo e permanece como uma meditação profunda sobre a natureza humana, o pecado, a redenção e a busca pelo divino. Sua influência na arte, literatura e pensamento ocidental é imensurável.`
  },
  // Orgulho e Preconceito — Jane Austen
  4: {
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    content: `Orgulho e Preconceito (em inglês: Pride and Prejudice) é um romance escrito por Jane Austen, publicado em 1813. É considerado uma das obras mais importantes da literatura inglesa e um dos romances mais amados de todos os tempos.

A história acompanha Elizabeth Bennet, segunda de cinco filhas de uma família da pequena nobreza rural inglesa, e sua relação com o orgulhoso e aparentemente arrogante Mr. Darcy. O romance explora como as primeiras impressões podem ser enganosas e como orgulho e preconceito podem impedir a felicidade.

Austen utiliza uma ironia refinada para criticar a sociedade georgiana britânica, suas convenções sobre casamento, classe social e papel da mulher. A famosa frase de abertura — "É uma verdade universalmente reconhecida que um homem solteiro, possuidor de uma boa fortuna, deve estar necessitado de uma esposa" — estabelece o tom satírico da obra.

Além do romance central entre Elizabeth e Darcy, a narrativa entrelaça histórias paralelas que ilustram diferentes atitudes em relação ao amor e ao casamento: o pragmatismo de Charlotte Lucas, a imprudência de Lydia Bennet e a bondade de Jane e Bingley.

A obra permanece atemporal por sua exploração da natureza humana, suas personagens vívidas e seu humor elegante. Orgulho e Preconceito continua a inspirar adaptações em cinema, televisão e literatura ao redor do mundo.`
  }
};

export async function fetchBookContent(bookId: number): Promise<string> {
  // Special IDs (0-10) are local-only entries
  if (bookId < 10) {
    const fallback = FALLBACK_SUMMARIES[bookId];
    if (fallback) {
      return `📖 ${fallback.title}\n✍️ ${fallback.author}\n\n─────────────────\n\n${fallback.content}`;
    }
    return 'Conteúdo indisponível no momento.';
  }

  try {
    const res = await fetch(`https://gutendex.com/books/${bookId}/`);
    if (!res.ok) throw new Error('API error');
    const data: GutendexBook = await res.json();
    
    const textUrl = data.formats['text/plain; charset=utf-8'] 
      || data.formats['text/plain'] 
      || data.formats['text/html; charset=utf-8']
      || data.formats['text/html'];
    
    if (textUrl) {
      const textRes = await fetch(textUrl);
      if (textRes.ok) {
        const text = await textRes.text();
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
    0: { title: "Meditações", author: "Marco Aurélio", emoji: "🧘" },
    1: { title: "A Arte da Guerra", author: "Sun Tzu", emoji: "⚔️" },
    2: { title: "O Príncipe", author: "Nicolau Maquiavel", emoji: "👑" },
    3: { title: "Divina Comédia", author: "Dante Alighieri", emoji: "🔥" },
    4: { title: "Orgulho e Preconceito", author: "Jane Austen", emoji: "💎" },
  };
  return info[bookId] || { title: "Livro", author: "Autor desconhecido", emoji: "📚" };
}
