export function toDirectDownload(url = "") {
  try {
    const u = new URL(url);

    if (u.hostname.includes("drive.google.com")) {
      // /file/d/<ID>/view
      const idFromPath = u.pathname.match(/\/file\/d\/([^/]+)/)?.[1];
      // /open?id=<ID>
      const idFromQuery = u.searchParams.get("id");
      const id = idFromPath || idFromQuery;

      if (id) {
        return `https://drive.google.com/uc?export=download&id=${id}`;
      }

      // Docs/Sheets/Slides => export como PDF por padrão
      const docId =
        u.pathname.match(/\/document\/d\/([^/]+)/)?.[1] ||
        u.pathname.match(/\/spreadsheets\/d\/([^/]+)/)?.[1] ||
        u.pathname.match(/\/presentation\/d\/([^/]+)/)?.[1];

      if (docId) {
        return `https://docs.google.com${u.pathname.replace(/\/edit.*$/, "")}/export?format=pdf`;
      }
    }

    return url;
  } catch {
    return url;
  }
}
