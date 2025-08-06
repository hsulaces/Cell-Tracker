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
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      authors: ["John Doe", "Jane Smith"],
      journal: "Journal of Research",
      date: "2025-05-15",
      doi: "https://doi.org/10.1002/art.42680",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
    {
      title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      authors: ["John Doe", "Jane Smith"],
      journal: "Journal of Research",
      date: "2024-09-15",
      doi: "https://doi.org/10.1002/art.42680",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
      {
      title: "Duis aute irure dolor in reprehenderit in voluptate velit",
      authors: ["John Doe", "Jane Smith"],
      journal: "Journal of Research",
      date: "2023-02-15",
      doi: "https://doi.org/10.1002/art.42680",
      type: "Research Article",
      image: "/img/place_holder.jpg"
    },
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
                          <span>DOI: {publication.doi}</span>
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

