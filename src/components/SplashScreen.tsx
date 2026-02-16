useEffect(() => {
  const audio = new Audio('/entry.mp3'); // ou o nome que você usa
  audio.volume = 0.4;
  audio.play().catch(() => {});
}, []);
