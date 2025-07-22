export default function handler(req, res) {
  if (req.method === 'POST') {
    const notification = req.body;
    console.log('Notifica da eBay (Universo Online Shopping):', notification);
    res.status(200).json({ message: 'Notifica per Universo Online Shopping ricevuta con successo' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
