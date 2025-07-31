// src/routes/cadd.ts (or wherever your Express route is defined)
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/cadd-score', async (req, res) => {
  const variant = req.query.variant as string; // e.g. "16-11255183-C-T"

  if (!variant || !variant.includes('-')) {
    return res.status(400).json({ error: 'Missing or malformed variant parameter' });
  }

  const [chrom, pos, ref, alt] = variant.split('-');

  // Format for the CADD API ver 1.7
  const caddUrl = `https://cadd.gs.washington.edu/api/v1.0/v1.7/${chrom}:${pos}-${ref}-${alt}`;

  try {
    const caddRes = await fetch(caddUrl);
    if (!caddRes.ok) throw new Error(`CADD API error: ${caddRes.status}`);

    const data = await caddRes.json(); // this is an array of results
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to retrieve CADD score' });
  }
});

export default router;
