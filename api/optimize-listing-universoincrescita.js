export default async function handler(req, res) {
  // 1. Controlla che sia POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Metodo ${req.method} non consentito` });
  }

  // 2. Verifica token eBay
  const token = process.env.EBAY_PROD_USER_TOKEN_UNIVERSOINCRESCITA;
  if (!token) {
    console.error("[API optimize-listing-universoincrescita.js] Token eBay mancante (EBAY_PROD_USER_TOKEN_UNIVERSOINCRESCITA)");
    return res.status(500).json({ error: "Errore di configurazione: manca il token eBay" });
  }

  // 3. Verifica presenza ID
  const { itemId } = req.body;
  if (!itemId) {
    return res.status(400).json({ error: "Parametro 'itemId' mancante nel body della richiesta" });
  }

  try {
    // 4. Chiamata alle API eBay (Buy → getItem)
    const ebayResponse = await fetch(`https://api.ebay.com/buy/browse/v1/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!ebayResponse.ok) {
      const text = await ebayResponse.text();
      throw new Error(`Errore eBay ${ebayResponse.status}: ${text}`);
    }

    const itemData = await ebayResponse.json();
    const imageUrl = itemData.image?.imageUrl || "Nessuna immagine trovata";

    // 5. MOCK UPSCALING
    const fakeUpscaledImage = "data:image/jpeg;base64,FAKE_IMAGE";

    // 6. Diario sintetico
    const diario = {
      id: itemId,
      titolo: itemData.title || "Titolo mancante",
      immagine_originale: imageUrl,
      upscaling: "mock completato",
      stato: "pronto per approvazione"
    };

    res.status(200).json({
      status: "ok",
      diario,
      immagine_ottimizzata: fakeUpscaledImage
    });

  } catch (err) {
    console.error(`[API optimize-listing] Errore durante elaborazione itemId ${itemId}:`, err);

    res.status(500).json({
      error: "Errore interno durante l’ottimizzazione",
      dettagli: err.message
    });
  }
}
