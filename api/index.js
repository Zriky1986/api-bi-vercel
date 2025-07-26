
export default function handler(req, res) {
  res.status(200).json({
    status: "🟢 API attiva",
    messaggio: "Benvenuto in api-bi-vercel. Usa gli endpoint /api/optimize-listing-[nome_store].js",
    esempio: {
      universoonlineshopping: "/api/optimize-listing-universoonlineshopping",
      universoincrescita: "/api/optimize-listing-universoincrescita",
      freedomevolutionlab: "/api/optimize-listing-freedomevolutionlab"
    },
    autore: "Riccardo Zuffo Projects"
  });
}
