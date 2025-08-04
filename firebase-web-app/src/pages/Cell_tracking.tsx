import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Plus, Edit, Trash2, TrendingUp, Activity, AlertTriangle } from 'lucide-react';


type CellLine = {
  id: number;
  name: string;
  type: string;
  passage: number;
  confluence: number;
  growthRate: number;
  lastUpdate: string;
  status: string;
  medium: string;
  notes: string;
};

type CellLineFormState = {
  name: string;
  type: string;
  passage: string;
  confluence: string;
  growthRate: string;
  medium: string;
  notes: string;
};

export function CellTrackingPage() {
  const [cellLines, setCellLines] = useState([
    {
      id: 1,
      name: "HeLa-001",
      type: "Immortalized",
      passage: 25,
      confluence: 85,
      growthRate: 1.2,
      lastUpdate: "2024-02-01",
      status: "healthy",
      medium: "DMEM + 10% FBS",
      notes: "Good growth, ready for passage"
    },
    {
      id: 2,
      name: "MCF7-002",
      type: "Cancer Cell Line",
      passage: 18,
      confluence: 95,
      growthRate: 0.8,
      lastUpdate: "2024-02-01",
      status: "ready-passage",
      medium: "RPMI + 10% FBS",
      notes: "High confluence, passage today"
    },
    {
      id: 3,
      name: "Primary-003",
      type: "Primary Culture",
      passage: 5,
      confluence: 60,
      growthRate: 0.6,
      lastUpdate: "2024-01-31",
      status: "slow-growth",
      medium: "Custom Medium",
      notes: "Slower than expected growth"
    },
    {
      id: 4,
      name: "HUVEC-004",
      type: "Endothelial",
      passage: 12,
      confluence: 75,
      growthRate: 1.1,
      lastUpdate: "2024-02-01",
      status: "healthy",
      medium: "EGM-2",
      notes: "Normal growth pattern"
    }
  ]);

const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

const [editingCell, setEditingCell] = useState<CellLine | null>(null);

const [newCellLine, setNewCellLine] = useState<CellLineFormState>({
  name: "",
  type: "",
  passage: "",
  confluence: "",
  growthRate: "",
  medium: "",
  notes: "",
});

  // Mock growth data for charts
  const growthData = [
    { day: 1, confluence: 20 },
    { day: 2, confluence: 35 },
    { day: 3, confluence: 52 },
    { day: 4, confluence: 68 },
    { day: 5, confluence: 85 },
    { day: 6, confluence: 95 },
  ];

  const passageData = cellLines.map(cell => ({
    name: cell.name,
    passages: cell.passage
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'ready-passage': return 'bg-orange-500';
      case 'slow-growth': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Healthy</Badge>;
      case 'ready-passage': return <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Ready for Passage</Badge>;
      case 'slow-growth': return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Slow Growth</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

const handleAddCellLine = () => {
  const newId = Math.max(...cellLines.map(c => c.id)) + 1;

  setCellLines([
    ...cellLines,
    {
      id: newId,
      ...newCellLine,
      passage: parseInt(newCellLine.passage),
      confluence: parseInt(newCellLine.confluence),
      growthRate: parseFloat(newCellLine.growthRate),
      lastUpdate: new Date().toISOString().split('T')[0],
      status: parseInt(newCellLine.confluence) > 90 ? 'ready-passage' : 'healthy',
    },
  ]);

  setNewCellLine({ name: "", type: "", passage: "", confluence: "", growthRate: "", medium: "", notes: "" });
  setIsAddDialogOpen(false);
};

  const handleEditCellLine = (cellLine: any) => {
    setEditingCell(cellLine);
    setNewCellLine({
      name: cellLine.name,
      type: cellLine.type,
      passage: cellLine.passage.toString(),
      confluence: cellLine.confluence.toString(),
      growthRate: cellLine.growthRate.toString(),
      medium: cellLine.medium,
      notes: cellLine.notes
    });
    setIsEditDialogOpen(true);
  };

const handleUpdateCellLine = () => {
  if (!editingCell) return;

  setCellLines(cellLines.map(cell =>
    cell.id === editingCell.id
      ? {
          ...cell,
          ...newCellLine,
          passage: parseInt(newCellLine.passage),
          confluence: parseInt(newCellLine.confluence),
          growthRate: parseFloat(newCellLine.growthRate),
          lastUpdate: new Date().toISOString().split('T')[0],
          status: parseInt(newCellLine.confluence) > 90 ? 'ready-passage' : 'healthy',
        }
      : cell
  ));

  setIsEditDialogOpen(false);
  setEditingCell(null);
};



  const handleDeleteCellLine = (id: number) => {
    setCellLines(cellLines.filter(cell => cell.id !== id));
  };

  return (
  <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(147,197,253,0.2)_0%,transparent_50%)]"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2">Cell Line Tracker Dashboard</h1>
          <p className="text-muted-foreground">
            Keep track of your cell lines with real-time growth metrics and analytics!
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-lg">
              <Plus className="w-4 h-4" />
              Add Cell Line
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-slate-800/95 backdrop-blur-md border border-slate-600 shadow-xl">
            <DialogHeader>
              <DialogTitle>Add New Cell Line</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-slate-200">Cell Line Name</Label>
                <Input
                  id="name"
                  value={newCellLine.name}
                  onChange={(e) => setNewCellLine({...newCellLine, name: e.target.value})}
                  placeholder="e.g., HeLa-005"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-slate-200">Type</Label>
                <Select value={newCellLine.type} onValueChange={(value : string) => setNewCellLine({...newCellLine, type: value})}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select cell type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Immortalized">Immortalized</SelectItem>
                    <SelectItem value="Cancer Cell Line">Cancer Cell Line</SelectItem>
                    <SelectItem value="Primary Culture">Primary Culture</SelectItem>
                    <SelectItem value="Endothelial">Endothelial</SelectItem>
                    <SelectItem value="Fibroblast">Fibroblast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passage" className="text-slate-200">Passage #</Label>
                  <Input
                    id="passage"
                    type="number"
                    value={newCellLine.passage}
                    onChange={(e) => setNewCellLine({...newCellLine, passage: e.target.value})}
                    placeholder="0"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="confluence" className="text-slate-200">Confluence %</Label>
                  <Input
                    id="confluence"
                    type="number"
                    max="100"
                    value={newCellLine.confluence}
                    onChange={(e) => setNewCellLine({...newCellLine, confluence: e.target.value})}
                    placeholder="0"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="growthRate" className="text-slate-200">Growth Rate</Label>
                <Input
                  id="growthRate"
                  type="number"
                  step="0.1"
                  value={newCellLine.growthRate}
                  onChange={(e) => setNewCellLine({...newCellLine, growthRate: e.target.value})}
                  placeholder="1.0"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <Label htmlFor="medium" className="text-slate-200">Culture Medium</Label>
                <Input
                  id="medium"
                  value={newCellLine.medium}
                  onChange={(e) => setNewCellLine({...newCellLine, medium: e.target.value})}
                  placeholder="e.g., DMEM + 10% FBS"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-slate-200">Notes</Label>
                <Input
                  id="notes"
                  value={newCellLine.notes}
                  onChange={(e) => setNewCellLine({...newCellLine, notes: e.target.value})}
                  placeholder="Optional notes"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <Button onClick={handleAddCellLine} className="w-full bg-blue-600 hover:bg-blue-500">
                Add Cell Line
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="container mx-auto px-8 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 py-4">
<           Card className="p-8 shadow-sm border bg-white/10 backdrop-blur-md border-white/20 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg mr-6">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cell Lines</p>
                <p className="text-2xl">{cellLines.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 shadow-sm border bg-white/10 backdrop-blur-md border-white/20 rounded-xl">

            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Healthy Lines</p>
                <p className="text-2xl">{cellLines.filter(c => c.status === 'healthy').length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 shadow-sm border bg-white/10 backdrop-blur-md border-white/20 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg mr-6">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Need Attention</p>
                <p className="text-2xl">{cellLines.filter(c => c.status !== 'healthy').length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 shadow-sm border bg-white/10 backdrop-blur-md border-white/20 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-6">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Confluence</p>
                <p className="text-2xl">{Math.round(cellLines.reduce((acc, c) => acc + c.confluence, 0) / cellLines.length)}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <h3 className="mb-4">Growth Progress (Last 6 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="confluence" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <h3 className="mb-4">Passage Numbers by Cell Line</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={passageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="passages" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Cell Lines Table */}
      <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
        <h3 className="mb-4">Cell Lines Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Passage</th>
                <th className="text-left p-3">Confluence</th>
                <th className="text-left p-3">Growth Rate</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Last Updated</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cellLines.map((cellLine) => (
                <tr key={cellLine.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">{cellLine.name}</td>
                  <td className="p-3">{cellLine.type}</td>
                  <td className="p-3">P{cellLine.passage}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Progress value={cellLine.confluence} className="w-16" />
                      <span className="text-sm">{cellLine.confluence}%</span>
                    </div>
                  </td>
                  <td className="p-3">{cellLine.growthRate}x</td>
                  <td className="p-3">{getStatusBadge(cellLine.status)}</td>
                  <td className="p-3">{cellLine.lastUpdate}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCellLine(cellLine)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCellLine(cellLine.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md bg-slate-800/95 backdrop-blur-md border-slate-600">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Cell Line</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name" className="text-slate-200">Cell Line Name</Label>
                <Input
                  id="edit-name"
                  value={newCellLine.name}
                  onChange={(e) => setNewCellLine({...newCellLine, name: e.target.value})}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-confluence" className="text-slate-200">Confluence %</Label>
                <Input
                  id="edit-confluence"
                  type="number"
                  max="100"
                  value={newCellLine.confluence}
                  onChange={(e) => setNewCellLine({...newCellLine, confluence: e.target.value})}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-notes" className="text-slate-200">Notes</Label>
                <Input
                  id="edit-notes"
                  value={newCellLine.notes}
                  onChange={(e) => setNewCellLine({...newCellLine, notes: e.target.value})}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <Button onClick={handleUpdateCellLine} className="w-full bg-blue-600 hover:bg-blue-500">
                Update Cell Line
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  </div>
  );
}

export default CellTrackingPage;
