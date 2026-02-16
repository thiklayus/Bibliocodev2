import { motion, AnimatePresence } from "framer-motion";

type Props = {
  pageIndex: number;
  setPageIndex: (n: number) => void;
  totalPages: number;
  renderPage: (pageIndex: number) => React.ReactNode;
};

export default function PageTurner({
  pageIndex,
  setPageIndex,
  totalPages,
  renderPage,
}: Props) {

  const paginate = (dir: number) => {
    const next = pageIndex + dir;
    if (next >= 0 && next < totalPages) {
      setPageIndex(next);
    }
  };

  return (
    <div className="relative w-full">

      <AnimatePresence mode="wait">
        <motion.div
          key={pageIndex}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ duration: 0.4 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) paginate(1);
            if (info.offset.x > 80) paginate(-1);
          }}
          className="select-none"
        >
          {renderPage(pageIndex)}
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 text-center text-xs text-muted-foreground">
        Página {pageIndex + 1} / {totalPages}
      </div>
    </div>
  );
}
