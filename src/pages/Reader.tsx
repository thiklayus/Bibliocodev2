import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ThemeSelector from '@/components/ThemeSelector';
import { fetchBookContent } from '@/lib/gutendex';
import { setLastRead } from '@/lib/reading-progress';

const BIBLE_CONTENT = `📖 Bíblia Sagrada — Almeida Corrigida Fiel

━━━━━━━━━━━━━━━━━━━━

GÊNESIS

Capítulo 1

1 No princípio criou Deus os céus e a terra.
2 E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.
3 E disse Deus: Haja luz. E houve luz.
4 E viu Deus que a luz era boa; e fez Deus separação entre a luz e as trevas.
5 E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã: o dia primeiro.
6 E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas.
7 E fez Deus a expansão e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão. E assim foi.
8 E chamou Deus à expansão Céus; e foi a tarde e a manhã: o dia segundo.
9 E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar; e apareça a porção seca. E assim foi.
10 E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares. E viu Deus que era bom.
11 E disse Deus: Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente esteja nela sobre a terra. E assim foi.
12 E a terra produziu erva, erva dando semente conforme a sua espécie e árvore frutífera, cuja semente está nela conforme a sua espécie. E viu Deus que era bom.
13 E foi a tarde e a manhã: o dia terceiro.
14 E disse Deus: Haja luminares na expansão dos céus, para haver separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos.
15 E sejam para luminares na expansão dos céus, para alumiar a terra. E assim foi.
16 E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e fez as estrelas.
17 E Deus os pôs na expansão dos céus para alumiar a terra,
18 E para governar o dia e a noite, e para fazer separação entre a luz e as trevas. E viu Deus que era bom.
19 E foi a tarde e a manhã: o dia quarto.
20 E disse Deus: Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus.
21 E Deus criou as grandes baleias, e todo réptil de alma vivente que as águas abundantemente produziram conforme as suas espécies, e toda ave de asas conforme a sua espécie. E viu Deus que era bom.
22 E Deus os abençoou, dizendo: Frutificai, e multiplicai-vos, e enchei as águas nos mares; e as aves se multipliquem na terra.
23 E foi a tarde e a manhã: o dia quinto.
24 E disse Deus: Produza a terra alma vivente conforme a sua espécie; gado, e répteis, e bestas-feras da terra conforme a sua espécie. E assim foi.
25 E fez Deus as bestas-feras da terra conforme a sua espécie, e o gado conforme a sua espécie, e todo o réptil da terra conforme a sua espécie. E viu Deus que era bom.
26 E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra, e sobre todo réptil que se move sobre a terra.
27 E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou.
28 E Deus os abençoou e Deus lhes disse: Frutificai, e multiplicai-vos, e enchei a terra, e sujeitai-a; e dominai sobre os peixes do mar, e sobre as aves dos céus, e sobre todo o animal que se move sobre a terra.
29 E disse Deus: Eis que vos tenho dado toda erva que dá semente e que está sobre a face de toda a terra e toda árvore em que há fruto que dá semente; ser-vos-ão para mantimento.
30 E a todo animal da terra, e a toda ave dos céus, e a todo réptil da terra, em que há alma vivente, toda a erva verde lhes será para mantimento. E assim foi.
31 E viu Deus tudo quanto tinha feito, e eis que era muito bom. E foi a tarde e a manhã: o dia sexto.

━━━━━━━━━━━━━━━━━━━━

Capítulo 2

1 Assim, os céus, a terra e todo o seu exército foram acabados.
2 E, havendo Deus acabado no dia sétimo a sua obra que tinha feito, descansou no sétimo dia de toda a sua obra, que tinha feito.
3 E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a sua obra, que Deus criara e fizera.

━━━━━━━━━━━━━━━━━━━━

Esta é uma amostra da Bíblia Sagrada na versão Almeida Corrigida Fiel (ACF).
O acervo completo será expandido em futuras atualizações do Bibliocode.`;

const Reader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      if (bookId === 'bible') {
        setTitle('Bíblia Sagrada ACF');
        setContent(BIBLE_CONTENT);
        setLastRead('bible', 'Bíblia Sagrada ACF', 1);
      } else if (bookId?.startsWith('gutenberg-')) {
        const id = parseInt(bookId.replace('gutenberg-', ''), 10);
        const { getBookInfo } = await import('@/lib/gutendex');
        const info = getBookInfo(id);
        setTitle(info.title);
        const text = await fetchBookContent(id);
        setContent(text);
        setLastRead(bookId, info.title, 1);
      } else if (bookId?.startsWith('local-')) {
        const id = parseInt(bookId.replace('local-', ''), 10);
        const { getBookInfo } = await import('@/lib/gutendex');
        const info = getBookInfo(id);
        setTitle(info.title);
        const text = await fetchBookContent(id);
        setContent(text);
        setLastRead(bookId, info.title, 1);
      }
      setLoading(false);
    };
    loadContent();
  }, [bookId]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-sm font-bold text-foreground truncate mx-4">{title}</h1>
          <ThemeSelector />
        </div>
      </header>

      <main className="px-4 py-8 md:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent/50" />
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="reader-text reader-landscape"
          >
            <div className="whitespace-pre-wrap text-foreground text-base md:text-lg leading-[1.8] tracking-[0.3px]">
              {content}
            </div>
          </motion.article>
        )}
      </main>

      <footer className="text-center py-6 border-t border-border">
        <p className="font-serif text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          Bibliocode • Desenvolvido por Thiklayus • Engenharia Humanística para o Conhecimento
        </p>
      </footer>
    </div>
  );
};

export default Reader;
