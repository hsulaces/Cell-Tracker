import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Search, Calendar, Users, BookOpen } from 'lucide-react';

const Publications = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const publications = [
    {
      title: "In cis “benign” SOCS1 variants linked to enhanced interferon signaling and autoimmunity",
      authors: ["E Hsu", "L Chen", "Q Chen", "M Liu", "Q Cheng", "S Rosen", "TF Michniacki", "J Chou", "MS Lo", "CD Platt", "PY Lee"],
      journal: "Journal of Autoimmunity, 2023",
      date: "2023-10-01",
      doi: "https://www.sciencedirect.com/science/article/am/pii/S0896841123001282",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "SOCS1 haploinsufficiency presenting as severe enthesitis, bone marrow hypocellularity, and refractory thrombocytopenia in a pediatric patient with subsequent response to JAK inhibition",
      authors: ["ML Basiaga", "KK Horst", "S Mohan", "L Chen", "K Brodeur", "Y Du", "D Frame", "S Ngo", "J Simoneau", "N Brown", "PY Lee"],
      journal: "Journal of Clinical Immunology, 2022",
      date: "2022-08-01",
      doi: "https://link.springer.com/content/pdf/10.1007/s10875-022-01346-x.pdf",
      type: "Clinical Case",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Immune dysregulation and multisystem inflammatory syndrome in children (MIS-C) in individuals with haploinsufficiency of SOCS1",
      authors: ["PY Lee", "CD Platt", "S Weeks", "RF Grace", "G Maher", "K Gauthier", "S Devana", "S Vitali", "AG Randolph", "DR McDonald"],
      journal: "Journal of Allergy and Clinical Immunology, 2020",
      date: "2020-11-01",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7445138/",
      type: "Landmark Case",
      image: "/img/place_holder.jpg"
    },
    {
      title: "A cohort study on deficiency of ADA2 from China",
      authors: ["L Guo", "W Tang", "H Chang", "Q Zhang", "X Li", "J Li", "Z Zhou", "S Yang", "K Yang", "H Xu", "H Song", "NT Deuitch", "PY Lee"],
      journal: "Journal of Clinical Immunology, 2023",
      date: "2023-04-01",
      doi: "https://link.springer.com/article/10.1007/s10875-023-01432-8",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Evaluation and management of deficiency of adenosine deaminase 2: an international consensus statement",
      authors: ["PY Lee", "BA Davidson", "RS Abraham", "B Alter", "JI Arostegui", "K Bell", "A Belot", "JRE Bergerson", "TJ Bernard"],
      journal: "JAMA Network Open, 2023",
      date: "2023-05-01",
      doi: "https://jamanetwork.com/journals/jamanetworkopen/articlepdf/2805457/lee_2023_cs_230003_1684514579.32894.pdf",
      type: "Consensus Statement",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Mechanisms of vascular inflammation in deficiency of adenosine deaminase 2 (DADA2)",
      authors: ["PY Lee", "I Aksentijevich", "Q Zhou"],
      journal: "Seminars in Immunopathology, 2022",
      date: "2022-03-01",
      doi: "",
      type: "Review Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "TNF inhibition in vasculitis management in ADA2 deficiency",
      authors: ["NT Deuitch", "D Yang", "PY Lee", "X Yu", "NS Moura", "O Schnappauf", "AK Ombrello", "D Stone", "HS Kuehn"],
      journal: "Journal of Allergy and Clinical Immunology, 2022",
      date: "2022-05-01",
      doi: "https://www.jacionline.org/article/S0091-6749(21)01693-6/pdf",
      type: "Clinical Evidence",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Comprehensive analysis of ADA2 genetic variants and estimation of carrier frequency driven by a function-based approach",
      authors: ["EP Chambers", "MS Hershfield", "Q Zhou", "F Dedeoglu", "I Aksentijevich", "PA Nigrovic", "A O'Donnell-Luria", "PY Lee"],
      journal: "Journal of Allergy and Clinical Immunology, 2022",
      date: "2022-01-01",
      doi: "https://www.sciencedirect.com/science/article/am/pii/S0091674921007338",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Hyperferritinemia screening to aid identification and differentiation of patients with hyperinflammatory disorders",
      authors: ["C Schneider", "J Baker", "P Tsoukas", "EM Behrens", "RQ Cron", "C Diorio", "LA Henderson", "G Schulert", "P Lee"],
      journal: "Journal of Clinical Immunology, 2025",
      date: "2025-01-01",
      doi: "https://link.springer.com/content/pdf/10.1007/s10875-024-01797-4.pdf",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Type I interferon signature and cycling lymphocytes in macrophage activation syndrome",
      authors: ["MB Son", "RP Sundel", "ML Taylor", "H Wu", "Q Zhou", "SW Canna", "K Wei", "LA Henderson", "PA Nigrovic", "PY Lee"],
      journal: "Journal of Clinical Investigation, 2023",
      date: "2023-11-01",
      doi: "https://www.jci.org/articles/view/165616",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "The multifaceted immunology of cytokine storm syndrome",
      authors: ["PY Lee", "RQ Cron"],
      journal: "Journal of Immunology, 2023",
      date: "2023-08-01",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10071410/",
      type: "Review Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "mTORC1 links pathology in experimental models of Still’s disease and macrophage activation syndrome",
      authors: ["RP Hasserjian", "LA Henderson", "DB Sykes", "ED Mellins", "SW Canna", "JF Charles", "PA Nigrovic", "PY Lee"],
      journal: "Nature Communications, 2022",
      date: "2022-11-01",
      doi: "https://www.nature.com/articles/s41467-022-34480-6",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "An evidence-based guideline improves outcomes for patients with hemophagocytic lymphohistiocytosis and macrophage activation syndrome",
      authors: ["MH Chang", "C Platt", "EM Cohen", "M Day-Lewis", "F Dedeoglu", "M Gorman", "JS Hausmann", "E Janssen", "PY Lee"],
      journal: "Journal of Rheumatology, 2022",
      date: "2022-09-01",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9588491/",
      type: "Clinical Guideline",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Elevation of IL-17 cytokines distinguishes Kawasaki disease from other pediatric inflammatory disorders",
      authors: ["O Halyabar", "MS Lo", "E Meidan", "RP Sundel", "LA Henderson", "PA Nigrovic", "JW Newburger", "MB Son", "PY Lee"],
      journal: "Arthritis & Rheumatology, 2024",
      date: "2024-02-01",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10842426/",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Ferroptosis of CD163+ macrophages and CD10+ epithelial cells in lupus nephritis",
      authors: ["Q Cheng", "L Mou", "W Su", "X Chen", "T Zhang", "Y Xie", "J Xue", "PY Lee", "H Wu", "Y Du"],
      journal: "Frontiers in Immunology, 2023",
      date: "2023-06-01",
      doi: "https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2023.1171318/pdf",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Disordered T cell-B cell interactions in autoantibody-positive inflammatory arthritis",
      authors: ["MM Hazen", "E Janssen", "J Lo", "MS Lo", "E Meidan", "JE Roberts", "H Wobma", "MBF Son", "RP Sundel", "PY Lee"],
      journal: "Frontiers in Immunology, 2023",
      date: "2023-03-01",
      doi: "https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2022.1068399/pdf",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Notch1/CD22 signaling axis disrupts Treg function in SARS-CoV-2–associated MIS-C",
      authors: ["Q Chen", "J Chou", "AM Julé", "R Boudra", "P Contini", "E Crestani", "PS Lai", "M Wang", "J Fong", "S Rockwitz", "P Lee"],
      journal: "Journal of Clinical Investigation, 2023",
      date: "2023-01-01",
      doi: "https://www.jci.org/articles/view/163235",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "How to build a fire: the genetics of autoinflammatory diseases",
      authors: ["J Zhang", "PY Lee", "I Aksentijevich", "Q Zhou"],
      journal: "Annual Review of Genetics, 2023",
      date: "2023-01-01",
      doi: "https://www.annualreviews.org/content/journals/10.1146/annurev-genet-030123-084224?TRACK=RSS",
      type: "Review Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Biologics and JAK inhibitors for the treatment of monogenic systemic autoinflammatory diseases in children",
      authors: ["Y Du", "M Liu", "PA Nigrovic", "F Dedeoglu", "PY Lee"],
      journal: "Journal of Allergy and Clinical Immunology, 2023",
      date: "2023-03-01",
      doi: "https://www.sciencedirect.com/science/article/am/pii/S0091674922025891",
      type: "Therapeutic Review",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Identification of an IL-1 receptor mutation driving autoinflammation directs IL-1-targeted drug design",
      authors: ["Y Wang", "J Wang", "W Zheng", "J Zhang", "J Wang", "T Jin", "P Tao", "Y Wang", "C Liu", "J Huang", "PY Lee", "X Yu", "Q Zhou"],
      journal: "Immunity, 2023",
      date: "2023-07-01",
      doi: "https://www.cell.com/immunity/fulltext/S1074-7613(23)00231-5?s=08",
      type: "Translational Research",
      image: "/img/place_holder.jpg"
    }
  ];

  // group pubs by full date (YYYY-MM-DD)
  const groupedByDate: Record<string, typeof publications> = {};

  publications.forEach(pub => {
    const date = pub.date;
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(pub);
  });

  // sort dates (most recent to oldest)
  const dates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // keep type extraction as is
  const types = [...new Set(publications.map(pub => pub.type))];

  //integrate search filter!
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDate = selectedDate === 'all' || pub.date.toString() === selectedDate;
    const matchesType = selectedType === 'all' || pub.type === selectedType;
    
    return matchesSearch && matchesDate && matchesType;
  });

  return (
    <section className="publications">
      <div className = "relative">
        <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-white mb-4">Publications</h1>
                <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                  View full list on: {' '}
                  <a href="https://scholar.google.com/citations?user=g1gsUXUAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a> or{' '}
                  <a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer">PubMed</a>.
                </p>
          </div>

          {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
              />
            </div>
            
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all" className="bg-slate-800">All Years</option>
              {dates.map(date => (
                <option key={date} value={date.toString()} className="bg-slate-800">{date}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all" className="bg-slate-800">All Types</option>
              {types.map(type => (
                <option key={type} value={type} className="bg-slate-800">{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pubs List */}
        <div className="space-y-6">
                {filteredPublications.map((publication, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg"
                  >
                    <div className="grid lg:grid-cols-4 gap-6">
                      {/* Image Preview */}
                      <div className="lg:col-span-1">
                        <div className="aspect-[3/2] rounded-lg overflow-hidden bg-white/5 border border-white/20">
                          <img
                            src={publication.image}
                            alt={`${publication.title} preview`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <h2 className="text-xl text-white leading-tight">
                            {publication.title}
                          </h2>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 shrink-0">
                            {publication.type}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{publication.authors.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{publication.journal}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{publication.date}</span>
                          </div>
                        </div>

                        <div className="pt-2 text-sm text-blue-300">
                          <span>{publication.journal}</span>
                          <br />
                          <span>DOI: {publication.doi ? (
                            <a href={publication.doi} target="_blank" rel="noopener noreferrer" className="underline">{publication.doi}</a>
                          ) : "Not available"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

      </div>

    </div>

    </section>
  );
};

export default Publications;