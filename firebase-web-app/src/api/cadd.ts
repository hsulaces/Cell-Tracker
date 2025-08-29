// src/routes/cadd.ts (or wherever your Express route is defined)
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const CADD_CASE_URL = 'https://cadd.gs.washington.edu/api/v1.0';
const CADD_BUILD = 'GRCh38-v1.7';
const PY_MAP_BASE = "http://localhost:8000"; // fastapi host

router.get('/cadd-score', async (req, res) => {
  console.log('GET /api/cadd-score', req.query);
  try {
    // direct path
    const variant   = (req.query.variant as string)   || ''; // chr-pos-ref-alt
    //indirect path
    const gene      = (req.query.gene as string)      || '';
    const cdna      = (req.query.cdna as string)      || '';
    const refParam  = (req.query.ref as string)       || '';
    const altParam  = (req.query.alt as string)       || '';

    let caddKey: string | null = null;

    let chrom: string | undefined;
    let pos: string | undefined;
    let ref: string | undefined;
    let alt: string | undefined;
    
    if (variant) {
      // process full genomic mode
      const parts = variant.split('-');
      if (parts.length !== 4) {
        return res.status(400).json({ error: 'variant must be chr-pos-ref-alt (hyphen separated)' });
      }
      [chrom, pos, ref, alt] = parts;
      caddKey = `${chrom}:${pos}_${ref.toUpperCase()}_${alt.toUpperCase()}`;

      // process HGVS mode
      // first resolve to gnomic via ensembl
    } else if (gene && cdna && refParam && altParam) {
      // console.log("converting to genomic");
      const mapURL =
        `${PY_MAP_BASE}/map_cdna?gene=${encodeURIComponent(gene)}` +
        `&cdna=${encodeURIComponent(cdna)}` +
        `&ref=${encodeURIComponent(refParam.toUpperCase())}` +
        `&alt=${encodeURIComponent(altParam.toUpperCase())}`;
      // call FastAPI mapper
      const mapRes = await fetch(mapURL);
      // console.log("HELLOOO" + mapRes);
      if (!mapRes.ok) {
        return res.status(502).json({ error: `map_cdna error ${mapRes.status}` });
      }
      const mapped: any = await mapRes.json();
      caddKey = mapped?.cadd_key;
      if (!caddKey) return res.status(500).json({ error: "map_cdna returned no cadd_key" });
    }else {
      return res.status(400).json({ error: 'Provide either ?variant=chr-pos-ref-alt or ?hgvs=ENST...:c.xxx' });
    }

    // perfrm CADD api query and call
    const caddURL = `${CADD_CASE_URL}/${CADD_BUILD}/${caddKey}`;
    const caddRes = await fetch(caddURL);
    if (!caddRes.ok) {
      return res.status(502).json({ error: `CADD API error: ${caddRes.status}` });
    }
    const caddData = await caddRes.json();
    return res.json({query: caddKey, cadd: caddData})
  } catch (e: any) {
    console.error('CADD API error:', e.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;

  // const variant = req.query.variant as string; // e.g. "16-11255183-C-T"

  // if (!variant || !variant.includes('-')) {
  //   return res.status(400).json({ error: 'Missing or malformed variant parameter' });
  // }

//   const [gene, ref, alt] = variant.split('-');

//   // convert genomic data to CADD API format
//   const response = await fetch(`/map?gene=` + gene);
//   const data = await response.json();
//   // grab data.result

//   // Format for the CADD API ver 1.7
//   const caddUrl = `https://cadd.gs.washington.edu/api/v1.0/GRCh38-v1.7/${chrom}:${pos}_${ref}_${alt}`;
//   // https://cadd.gs.washington.edu/api/v1.0/GRCh38-v1.7/16:11255334_C_A SOCS1 A49S WORKS BTW
//   console.log(caddUrl);

//   try {
//     const caddRes = await fetch(caddUrl);
//     if (!caddRes.ok) throw new Error(`CADD API error: ${caddRes.status}`);

//     const data = await caddRes.json(); // an array of results
//     return res.json(data);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Failed to retrieve CADD score' });
//   }
// });


