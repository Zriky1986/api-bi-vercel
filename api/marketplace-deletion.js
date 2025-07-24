import crypto from 'crypto';

export default async function handler(req, res) {
  // Gestione GET per la validazione webhook
  if (req.method === 'GET') {
    const challengeCode = req.query.challenge_code;

    if (challengeCode) {
      const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;
      const endpointUrl = 'https://api-bi-vercel.vercel.app/api/marketplace-deletion';

      if (!verificationToken) {
        console.error('ERRORE: la variabile EBAY_VERIFICATION_TOKEN non è impostata.');
        return res.status(500).json({ message: 'Configurazione del server incompleta.' });
      }

      const stringToHash = challengeCode + verificationToken + endpointUrl;
      const hash = crypto.createHash('sha256').update(stringToHash, 'utf-8').digest('hex');

      return res.status(200).json({
        challengeResponse: hash
      });
    } else {
      return res.status(400).json({ message: 'Errore: parametro challenge_code mancante.' });
    }
  }

  // Gestione POST per le notifiche di eliminazione account
  if (req.method === 'POST') {
    console.log('Notifica di cancellazione ricevuta:', req.body);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: `Metodo ${req.method} non consentito.` });
}
