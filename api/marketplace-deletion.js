import crypto from 'crypto';

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    const challengeCode = req.query.challenge_code;

    if (challengeCode) {
      // Legge il token in modo sicuro dalle Variabili d'Ambiente di Vercel
      const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;
      
      const endpointUrl = "https://api-bi-vercel.app/api/marketplace-deletion";

      // Controlla che la variabile d'ambiente sia impostata su Vercel
      if (!verificationToken) {
        console.error("ERRORE: La variabile d'ambiente EBAY_VERIFICATION_TOKEN non è impostata.");
        return res.status(500).json({ message: "Configurazione del server incompleta." });
      }

      // Crea la stringa per l'hash come richiesto da eBay
      const stringToHash = challengeCode + verificationToken + endpointUrl;

      // Calcola l'hash SHA-256
      const hash = crypto.createHash('sha256').update(stringToHash, 'utf-8').digest('hex');

      // Invia la risposta JSON corretta
      res.status(200).json({
        challengeResponse: hash
      });

    } else {
      res.status(400).json({ message: 'Errore: parametro challenge_code mancante.' });
    }
    return;
  }

  if (req.method === 'POST') {
    console.log('Notifica di cancellazione ricevuta:', req.body);
    res.status(204).end(); 
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ message: `Metodo ${req.method} non consentito.` });
}
