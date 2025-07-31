import React, { useState } from 'react';

function VariantHelper() {
  const [chr, setChr] = useState('');
  const [pos, setPos] = useState('');
  const [ref, setRef] = useState('');
  const [alt, setAlt] = useState('');
  const [scoreData, setScoreData] = useState<{ raw_score: number; phred: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchScore = async () => {
    const variant = `${chr}-${pos}-${ref}-${alt}`;
    setLoading(true);
    setError(null);
    setScoreData(null);

    try {
      const response = await fetch(`/api/cadd-score?variant=${variant}`);
      const data = await response.json();
      console.log("CADD API response:", data);

      const variantData = data[0];

      if (variantData?.RawScore !== undefined && variantData?.PHRED !== undefined) {
        setScoreData({
          raw_score: parseFloat(variantData.RawScore),
          phred: parseFloat(variantData.PHRED)
        });
      } else {
        throw new Error('CADD score not found in response');
      }
    } catch (err: any) {
      console.error('Failed to fetch CADD score:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Variant Helper</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input type="text" placeholder="Chromosome (e.g. 5)" value={chr} onChange={(e) => setChr(e.target.value)} />
        <input type="text" placeholder="Position (e.g. 2003402)" value={pos} onChange={(e) => setPos(e.target.value)} />
        <input type="text" placeholder="Ref allele (e.g. C)" value={ref} onChange={(e) => setRef(e.target.value)} />
        <input type="text" placeholder="Alt allele (e.g. A)" value={alt} onChange={(e) => setAlt(e.target.value)} />
        <button onClick={handleFetchScore} disabled={loading}>
          {loading ? 'Fetching...' : 'Get CADD Score'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {scoreData && (
        <div>
          <p><strong>Raw Score:</strong> {scoreData.raw_score}</p>
          <p><strong>PHRED Score:</strong> {scoreData.phred}</p>
        </div>
      )}
    </div>
  );
}

export default VariantHelper;
