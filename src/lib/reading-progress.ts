export function getProgress(bookId: string): number {
  const val = localStorage.getItem(`bibliocode-progress-${bookId}`);
  return val ? parseInt(val, 10) : 0;
}

export function setProgress(bookId: string, chapter: number) {
  localStorage.setItem(`bibliocode-progress-${bookId}`, String(chapter));
}

export function getLastRead(): { bookId: string; title: string; chapter: number } | null {
  const val = localStorage.getItem('bibliocode-last-read');
  return val ? JSON.parse(val) : null;
}

export function setLastRead(bookId: string, title: string, chapter: number) {
  localStorage.setItem('bibliocode-last-read', JSON.stringify({ bookId, title, chapter }));
}
