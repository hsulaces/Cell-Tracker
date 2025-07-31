import React, { useEffect, useState } from 'react';

function VariantHelper() {
  const [scoreData, setScoreData] = useState<{ raw_score: number; phred: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        const response = await fetch('/api/cadd-score?variant=5-2003402-C-A');
        const data = await response.json();
        console.log("CADD API response:", data);

        const variant = data[0]; //grab array of res

        if (variant?.RawScore !== undefined && variant?.PHRED !== undefined) {
          setScoreData({
            raw_score: parseFloat(variant.RawScore),
            phred: parseFloat(variant.PHRED)
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
    }

    fetchScore();
  }, []);

  return (
    <div>
      <h2>Welcome to the Variant Helper Page</h2>
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
