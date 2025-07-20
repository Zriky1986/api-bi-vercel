// marketplace-deletion.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const challengeCode = req.query.challenge_code;
    if (challengeCode) {
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(challengeCode);
    } else {
      res.status(400).json({ message: 'Missing challenge_code' });
    }
    return;
  }

  if (req.method === 'POST') {
    console.log('Notifica ricevuta:', req.body);
    res.status(204).end();
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ message: `Method ${req.method} not allowed.` });
}
