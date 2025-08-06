import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { AlertTriangle, CheckCircle, Info, Search, Download } from 'lucide-react';

interface Variant {
  chromosome: string;
  position: string;
  ref: string;
  alt: string;
  gene: string;
  consequence: string;
  clinicalSignificance: string;
  alleleFrequency: number;
  pathogenicityScore: number;
}

function VariantHelper() {
  const [activeTab, setActiveTab] = useState('search');
  const [analysisResults, setAnalysisResults] = useState<Variant[]>([]);
  const [batchInput, setBatchInput] = useState('');

  //single var (cadd for now)
    const [singleVariant, setSingleVariant] = useState({
    chromosome: '',
    position: '',
    ref: '',
    alt: '',
    gene: ''
  });

  //batch temp mock data display
  const handleBatchAnalysis = () => {
    // Mock batch analysis results
    const mockResults: Variant[] = [
      {
        chromosome: '17',
        position: '41234567',
        ref: 'C',
        alt: 'T',
        gene: 'BRCA1',
        consequence: 'missense_variant',
        clinicalSignificance: 'Pathogenic',
        alleleFrequency: 0.0005,
        pathogenicityScore: 0.92
      },
      {
        chromosome: '13',
        position: '32315474',
        ref: 'G',
        alt: 'A',
        gene: 'BRCA2',
        consequence: 'synonymous_variant',
        clinicalSignificance: 'Benign',
        alleleFrequency: 0.15,
        pathogenicityScore: 0.1
      },
      {
        chromosome: '7',
        position: '87123456',
        ref: 'T',
        alt: 'C',
        gene: 'CFTR',
        consequence: 'frameshift_variant',
        clinicalSignificance: 'Pathogenic',
        alleleFrequency: 0.0001,
        pathogenicityScore: 0.98
      }
    ];
    
    setAnalysisResults(mockResults);
  };

  //color scheme for var significance
    const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'Pathogenic':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Likely Pathogenic':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Uncertain Significance':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Likely Benign':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Benign':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };
  //^^ and scheme for icon
    const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'Pathogenic':
      case 'Likely Pathogenic':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Benign':
      case 'Likely Benign':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  // const [chr, setChr] = useState('');
  // const [pos, setPos] = useState('');
  // const [ref, setRef] = useState('');
  // const [alt, setAlt] = useState('');
  const [scoreData, setScoreData] = useState<{ raw_score: number; phred: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle single variant analysis
  const handleSingleVariantAnalysis = async () => {
    const { chromosome, position, ref, alt } = singleVariant;
    const variantStr = `${chromosome}-${position}-${ref}-${alt}`;
    setLoading(true);
    setError(null);
    setScoreData(null);

    try {
      const response = await fetch(`/api/cadd-score?variant=${variantStr}`);
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
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-white mb-4">Variant Helper</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Comprehensive in-silico tools for analyzing genetic variants + predicting pathogenicity
          </p>
        </div>

        {/* Main interface */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-white/5 border-b border-white/20 rounded-t-xl rounded-b-none">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200"
              >
                Single Variant
              </TabsTrigger>
              <TabsTrigger 
                value="batch" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200"
              >
                Batch Analysis
              </TabsTrigger>
            </TabsList>

              {/* single var (main tab) */}
              <TabsContent value="search" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white mb-4">Search Single Variant</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="chromosome" className="text-blue-200">Chromosome</Label>
                      <Input
                        id="chromosome"
                        value={singleVariant.chromosome}
                        onChange={(e) => setSingleVariant({...singleVariant, chromosome: e.target.value})}
                        placeholder="1"
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position" className="text-blue-200">Position</Label>
                      <Input
                        id="position"
                        value={singleVariant.position}
                        onChange={(e) => setSingleVariant({...singleVariant, position: e.target.value})}
                        placeholder="123456789"
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ref" className="text-blue-200">Reference</Label>
                      <Input
                        id="ref"
                        value={singleVariant.ref}
                        onChange={(e) => setSingleVariant({...singleVariant, ref: e.target.value})}
                        placeholder="A"
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="alt" className="text-blue-200">Alternate</Label>
                      <Input
                        id="alt"
                        value={singleVariant.alt}
                        onChange={(e) => setSingleVariant({...singleVariant, alt: e.target.value})}
                        placeholder="G"
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gene" className="text-blue-200">Gene (Optional)</Label>
                      <Input
                        id="gene"
                        value={singleVariant.gene}
                        onChange={(e) => setSingleVariant({...singleVariant, gene: e.target.value})}
                        placeholder="SOCS1"
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSingleVariantAnalysis} disabled={loading}
                    className="mt-4 bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? 'Analyzing...' : 'Analyze Variant'}
                  </Button>

                  {/* Single Variant Results */}
                  {error && (
                    <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-300">Error: {error}</p>
                    </div>
                  )}

                  {scoreData && (
                    <div className="mt-4 bg-white/5 border border-white/20 rounded-lg p-4">
                      <h4 className="text-white mb-3">CADD Score Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-blue-200">Raw Score:</span>
                          <span className="text-white ml-2 font-mono">{scoreData.raw_score.toFixed(4)}</span>
                        </div>
                        <div>
                          <span className="text-blue-200">PHRED Score:</span>
                          <span className="text-white ml-2 font-mono">{scoreData.phred.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(scoreData.phred / 30 * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-blue-200 mt-1">
                          Higher PHRED scores indicate higher pathogenicity potential
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* batch tab */}
            <TabsContent value="batch" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white mb-4">Batch Variant Analysis</h3>
                  <p className="text-blue-200 mb-4">
                    Upload a VCF file or paste variant coordinates (one per line) in the format: chr:pos:ref:alt
                  </p>
                  <div className="space-y-4">
                    <Textarea
                      value={batchInput}
                      onChange={(e) => setBatchInput(e.target.value)}
                      placeholder="chr17:41234567:C:T&#10;chr13:32315474:G:A&#10;chr7:87123456:T:C"
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 h-32"
                    />
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleBatchAnalysis}
                        className="bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Analyze Batch
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Upload VCF File
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
  
      {/* results */}
        {analysisResults.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Analysis Results</h3>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
            
            <div className="space-y-4">
              {analysisResults.map((variant, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/20 rounded-lg p-4"
                >
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white">{variant.gene}</h4>
                        <Badge className={getSignificanceColor(variant.clinicalSignificance)}>
                          {getSignificanceIcon(variant.clinicalSignificance)}
                          {variant.clinicalSignificance}
                        </Badge>
                      </div>
                      <div className="text-sm text-blue-200">
                        <div>{variant.chromosome}:{variant.position}</div>
                        <div>{variant.ref} → {variant.alt}</div>
                        <div>Consequence: {variant.consequence}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-blue-200">Allele Frequency:</span>
                        <span className="text-white ml-2">{variant.alleleFrequency.toFixed(4)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-blue-200">Pathogenicity Score:</span>
                        <span className="text-white ml-2">{variant.pathogenicityScore.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${variant.pathogenicityScore * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="text-center">
                        <div className="text-2xl text-white mb-1">
                          {(variant.pathogenicityScore * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-blue-200">
                          Confidence
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
//       {/* <div style={{ marginBottom: '1rem' }}>
//         <input type="text" placeholder="Chromosome (e.g. 5)" value={chr} onChange={(e) => setChr(e.target.value)} />
//         <input type="text" placeholder="Position (e.g. 2003402)" value={pos} onChange={(e) => setPos(e.target.value)} />
//         <input type="text" placeholder="Ref allele (e.g. C)" value={ref} onChange={(e) => setRef(e.target.value)} />
//         <input type="text" placeholder="Alt allele (e.g. A)" value={alt} onChange={(e) => setAlt(e.target.value)} />
//         <button onClick={handleFetchScore} disabled={loading}>
//           {loading ? 'Fetching...' : 'Get CADD Score'}
//         </button>
//       </div> */}
// {/* 
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       {scoreData && (
//         <div>
//           <p><strong>Raw Score:</strong> {scoreData.raw_score}</p>
//           <p><strong>PHRED Score:</strong> {scoreData.phred}</p>
//         </div>
//       )}
//     </div> */}
  );
}

export default VariantHelper;
