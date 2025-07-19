export default function handler(req, res) {
  if (req.method === 'POST') {
    const notification = req.body;

    console.log('📬 Notifica ricevuta da eBay (Universo in crescita):', notification);

    res.status(200).json({ message: 'Notifica per Universo in crescita ricevuta correttamente' });
  } else {
    res.status(405).json({ error: 'Metodo non consentito' });
  }
}
