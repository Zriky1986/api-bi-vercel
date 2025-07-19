export default function handler(req, res) {
  if (req.method === 'POST') {
    // Riceve una notifica da eBay
    const notification = req.body;

    console.log('📬 Notifica ricevuta da eBay:', notification);

    // Qui si può salvare la notifica, inviarla su Telegram, loggarla, ecc.
    res.status(200).json({ message: 'Notifica ricevuta con successo' });
  } else {
    // Per qualsiasi metodo diverso da POST
    res.status(405).json({ error: 'Metodo non consentito' });
  }
}
