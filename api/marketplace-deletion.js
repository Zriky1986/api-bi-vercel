// Force redeploy for eBay webhook verification

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Log per debug (opzionale, puoi toglierlo in produzione)
    console.log('Ricevuta richiesta di cancellazione account:', req.body);

    // eBay richiede risposta immediata con 204 No Content
    res.status(204).end();

    // Qui sotto (in modo asincrono) puoi aggiungere la logica per cancellare i dati utente
    // esempio:
    // await deleteUserData(req.body.userId); // <- funzione da implementare nel tuo sistema
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

