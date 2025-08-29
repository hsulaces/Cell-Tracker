# fastapi_app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

ENSEMBL = "https://rest.ensembl.org"

#fn to convert conventional gene name (Eg. CECR1) to ENST id
def get_canonical_enst(symbol: str) -> str:
    url = f"{ENSEMBL}/lookup/symbol/homo_sapiens/{symbol}?expand=1"
    r = requests.get(url, headers={"Content-Type": "application/json"})
    if not r.ok:
        raise HTTPException(status_code=502, detail=f"Ensembl lookup error {r.status_code}")
    obj = r.json()
    txs = obj.get("Transcript") or []
    if not txs:
        raise HTTPException(status_code=404, detail=f"No transcripts for {symbol}")
    can = next((t for t in txs if t.get("is_canonical") == 1), txs[0])
    return can["id"]  # enst id from ensembl

@app.get("/map_cdna")
def map_cdna(gene: str, cdna: str, ref: str, alt: str):
    ""
    enst = get_canonical_enst(gene)
    hgvs = f"{enst}:c.{cdna}{ref}>{alt}"  #e.g. ENST00000369805:c.147G>C
    vep_url = f"{ENSEMBL}/vep/human/hgvs/{requests.utils.quote(hgvs, safe='')}?content-type=application/json"
    r = requests.get(vep_url, headers={"Content-Type": "application/json"}) #request nucleic acid position relative to gene
    if not r.ok:
        raise HTTPException(status_code=502, detail=f"VEP error {r.status_code}")
    arr = r.json()
    if not arr:
        raise HTTPException(status_code=404, detail="No VEP mapping returned")

    hit = arr[0]
    chr_ = str(hit["seq_region_name"])
    pos = int(hit["start"])
    ref, alt = hit["allele_string"].split("/")

    return {
        "gene": gene,
        "enst": enst,
        "hgvs": hgvs,
        "chrom": chr_,
        "pos": pos,
        "ref": ref,
        "alt": alt,
        "cadd_key": f"{chr_}:{pos}-{ref}-{alt}"
    } #return cadd key from parsed info from vep mapping
