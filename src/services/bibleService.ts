const BASE_URL = "https://bible-api.com";

export async function getChapter(book: string, chapter: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/${encodeURIComponent(book)}+${chapter}?translation=almeida`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar capítulo");
    }

    const data = await response.json();

    return data.verses || [];
  } catch (error) {
    console.error("Erro Bible API:", error);
    return [];
  }
}
