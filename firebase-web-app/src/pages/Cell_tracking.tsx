import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Trash2, TrendingUp, Activity, AlertTriangle, CalendarDays, ChevronLeft, ChevronRight} from 'lucide-react';

import { WeeklyCal } from '../components/cell_tracking/weekly_cal';
import { OverviewCards } from '../components/cell_tracking/overview_cards';

type CellLine = {
  id: number;
  name: string;
  type: string;
  passage: number;
  confluence: number;
  growthRate: number;
  lastUpdate: string;
  lastPassageDate: string;
  status: string;
  medium: string;
  notes: string;
  reporters: string[];
};

type CellLineFormState = {
  name: string;
  type: string;
  passage: string;
  confluence: string;
  growthRate: string;
  medium: string;
  reporters: string[];
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
      lastUpdate: "2025-08-01",
      lastPassageDate: "2025-07-29",
      medium: "DMEM + 10% FBS",
      reporters: ["Luciferase", "GFP"],
      status: "healthy",
      notes: "Good growth, ready for passage"
    },
    {
      id: 2,
      name: "HEK 293T",
      type: "Immortalized",
      passage: 31,
      confluence: 90,
      growthRate: 1.5,
      lastPassageDate: "2024-01-22",
      medium: "DMEM",
      reporters: ["Luciferase"],
      status: "ready-passage",
      notes: "Fast growing, needs attention"
    }
  ]);

const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
const [selectedCellsForPassage, setSelectedCellsForPassage] = useState<number[]>([]);

const [editingCell, setEditingCell] = useState<CellLine | null>(null);

const [newCellLine, setNewCellLine] = useState<CellLineFormState>({
  name: "",
  type: "",
  passage: "",
  confluence: "",
  growthRate: "",
  medium: "",
  reporters: [],
  notes: "",
});

// Calculate days since last passage
  const getDaysSincePassage = (dateString: string) => {
    const passageDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - passageDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
  };

  // Get time badge color based on days
  const getTimeBadgeVariant = (days: number) => {
    if (days <= 3) return "bg-green-500/20 text-green-300 border-green-500/30";
    if (days <= 5) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

const handlePassSelectedCells = () => {
  setCellLines(cellLines.map(cell => {
    if (selectedCellsForPassage.includes(cell.id)) {
      return {
        ...cell,
        passage: cell.passage + 1,
        confluence: 20, // Reset confluence to low after passage
        lastPassageDate: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().split('T')[0],
        status: 'healthy' // Reset status after passage
      };
    }
    return cell;
  }));
  
  setSelectedCellsForPassage([]);
  setIsPassDialogOpen(false);
};

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Healthy</Badge>;
      case 'ready-passage':
        return <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Ready for Passage</Badge>;
      case 'slow-growth':
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Slow Growth</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  // Get medium badge color
  const getMediumColor = (medium: string) => {
    const colors: { [key: string]: string } = {
      "DMEM": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "RPMI": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "Custom": "bg-gray-500/20 text-gray-300 border-gray-500/30",
      "EGM-2": "bg-teal-500/20 text-teal-300 border-teal-500/30"
    };
    return colors[medium] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  // Get urgent cell lines
  const urgentCellLines = cellLines.filter(c => 
    c.status === 'ready-passage' || getDaysSincePassage(c.lastPassageDate) > 6
  );

  // Calculate upcoming passages
  const getUpcomingPassages = () => {
    const today = new Date();
    const upcoming: any[] = [];
    
    cellLines.forEach(cell => {
      const lastPassage = new Date(cell.lastPassageDate);
      const estimatedNext = new Date(lastPassage);
      estimatedNext.setDate(lastPassage.getDate() + 7); // Assume 7-day cycle
      
      if (estimatedNext >= today) {
        upcoming.push({
          ...cell,
          estimatedDate: estimatedNext,
          daysUntil: Math.ceil((estimatedNext.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        });
      }
    });
    
    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const handleAddCellLine = () => {
    const newId = Math.max(...cellLines.map(c => c.id)) + 1;
    setCellLines([...cellLines, {
      id: newId,
      ...newCellLine,
      passage: parseInt(newCellLine.passage),
      confluence: parseInt(newCellLine.confluence),
      growthRate: parseFloat(newCellLine.growthRate),
      lastPassageDate: new Date().toISOString().split('T')[0],
      reporters: [],
      status: parseInt(newCellLine.confluence) > 90 ? 'ready-passage' : 'healthy'
    }]);
    setNewCellLine({
      name: "",
      type: "",
      passage: "",
      confluence: "",
      growthRate: "",
      medium: "",
      reporters: [],
      notes: ""
    });
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
      reporters: cellLine.reporters || [],
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
        <div className="text-left">
          <h1 className="mb-2">Cell Line Tracker Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your cell lines with real-time growth metrics and analytics! <b> Log in </b> to save your data.
          </p>
        </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-purple-800 hover:bg-purple-600 text-white shadow-lg">
                <Plus className="w-4 h-4" />
                Add Cell Line
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-slate-800/95 backdrop-blur-md border-slate-600">
              <DialogHeader>
                {/* ADD NEW CELLINE FEATURE */}
                <DialogTitle className="text-white">Add New Cell Line</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">  
                  <div>
                    <Label htmlFor="name" className="text-slate-200">Cell Line Name</Label>
                    <Input
                      id="name"
                      value={newCellLine.name}
                      maxLength={30}
                      onChange={(e) => setNewCellLine({...newCellLine, name: e.target.value})}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-slate-200">Type</Label>
                    <Select value={newCellLine.type} onValueChange={(value) => setNewCellLine({...newCellLine, type: value})}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select cell type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="Immortalized" className="text-white">Immortalized</SelectItem>
                        <SelectItem value="Cancer Cell Line" className="text-white">Cancer Cell Line</SelectItem>
                        <SelectItem value="Primary Culture" className="text-white">Primary Culture</SelectItem>
                        <SelectItem value="Endothelial" className="text-white">Endothelial</SelectItem>
                        <SelectItem value="Fibroblast" className="text-white">Fibroblast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                  <Label htmlFor="medium" className="text-slate-200">Culture Medium</Label>
                  <Select value={newCellLine.medium} onValueChange={(value) => setNewCellLine({...newCellLine, medium: value})}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="DMEM" className="text-white">DMEM</SelectItem>
                      <SelectItem value="RPMI" className="text-white">RPMI</SelectItem>
                      <SelectItem value="EGM-2" className="text-white">EGM-2</SelectItem>
                      <SelectItem value="Custom" className="text-white">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-slate-200">Notes</Label>
                  <Input
                    id="notes"
                    value={newCellLine.notes}
                    maxLength={50}
                    onChange={(e) => setNewCellLine({...newCellLine, notes: e.target.value})}
                    placeholder="Optional notes"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <Button onClick={handleAddCellLine} className="w-full bg-purple-800 hover:bg-purple-600">
                  Add Cell Line
                </Button>
              </div>
            </DialogContent>
          </Dialog>
      </div>

      {/* OVERVIEW CARDS COMPONENT */}
      <OverviewCards cellLines={cellLines} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area - Takes up 2/3 of the space */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Data Table */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
            
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white mb-4">Cell Lines Overview</h3>
                <Button 
                  className="flex items-center gap-2 bg-purple-800 hover:bg-purple-600 text-white shadow-lg"
                  onClick={() => setIsPassDialogOpen(true)}
                >
                  <CalendarDays className="w-4 h-4" />
                  Pass Cells
                </Button>
              </div>
                
                <div className="rounded-md border border-white/20 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-white/20 hover:bg-white/5">
                        <TableHead className="text-blue-200">Actions</TableHead>
                        <TableHead className="text-blue-200">Cell Line</TableHead>
                        <TableHead className="text-blue-200">Type</TableHead>
                        <TableHead className="text-blue-200">Passage</TableHead>
                        <TableHead className="text-blue-200">Confluence</TableHead>
                        <TableHead className="text-blue-200">Growth Rate</TableHead>
                        <TableHead className="text-blue-200">Last Passage</TableHead>
                        <TableHead className="text-blue-200">Medium</TableHead>
                        <TableHead className="text-blue-200">Reporters</TableHead>
                        <TableHead className="text-blue-200">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {cellLines.map((cellLine) => {
                      const daysSince = getDaysSincePassage(cellLine.lastPassageDate);
                      return (
                        <TableRow key={cellLine.id} className="border-b border-white/10 hover:bg-white/5">
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditCellLine(cellLine)}
                                className="text-blue-300 hover:bg-white/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCellLine(cellLine.id)}
                                className="text-red-300 hover:bg-red-500/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-white">{cellLine.name}</TableCell>
                          <TableCell className="text-slate-300">{cellLine.type}</TableCell>
                          <TableCell className="text-slate-300">P{cellLine.passage}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-700/50 rounded-full h-2">
                                <div 
                                  className="bg-blue-400 h-2 rounded-full" 
                                  style={{ width: `${cellLine.confluence}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-slate-300">{cellLine.confluence}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-300">{cellLine.growthRate}x</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm text-slate-300">{cellLine.lastPassageDate}</div>
                              <Badge className={`text-xs ${getTimeBadgeVariant(daysSince)}`}>
                                {daysSince} days ago
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getMediumColor(cellLine.medium)}>
                              {cellLine.medium}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {cellLine.reporters.map((reporter, idx) => (
                                <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                  {reporter}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(cellLine.status)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* WEEKLY CAL COMPONENT */}
          <WeeklyCal cellLines={cellLines} />
      </div>

      {/* side panels */}
       <div className="space-y-6">
            {/* need attention side panel */}
            {urgentCellLines.length > 0 && (
              <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/20 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-orange-300" />
                  <span className="text-orange-200 font-medium text-sm">
                    Needs Attention
                  </span>
                </div>
                <div className="space-y-2">
                  {urgentCellLines.map(cell => (
                    <div key={cell.id} className="bg-white/5 p-2 rounded-lg">
                      <div className="text-sm text-white font-medium">{cell.name}</div>
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs mt-1">
                        {cell.status === 'ready-passage' ? 'Ready for passage' : `${getDaysSincePassage(cell.lastPassageDate)} days overdue`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* upcoming cell passages */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-blue-300" />
                <h3 className="text-white">Upcoming Passages</h3>
              </div>
              <div className="space-y-3">
                {getUpcomingPassages().slice(0, 5).map((cell) => (
                  <div key={cell.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="font-medium text-sm text-white">{cell.name}</div>
                      <div className="text-xs text-blue-200">
                        {cell.estimatedDate.toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={cell.daysUntil <= 2 ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-blue-500/20 text-blue-300 border-blue-500/30"}>
                      {cell.daysUntil} days
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* some quick stats */}
                        {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
              <h3 className="text-white mb-4">Quick Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-200">Avg Confluence</span>
                  <span className="font-medium text-white">
                    {Math.round(cellLines.reduce((acc, c) => acc + c.confluence, 0) / cellLines.length)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-200">Avg Growth Rate</span>
                  <span className="font-medium text-white">
                    {(cellLines.reduce((acc, c) => acc + c.growthRate, 0) / cellLines.length).toFixed(1)}x
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-200">Ready for Passage</span>
                  <span className="font-medium text-orange-300">
                    {cellLines.filter(c => c.status === 'ready-passage').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md bg-slate-800/95 backdrop-blur-md border-slate-600">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Cell Line</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">  
                <div>
                  <Label htmlFor="edit-name" className="text-slate-200">Cell Line Name</Label>
                  <Input
                    id="edit-name"
                    value={newCellLine.name}
                    maxLength={30}
                    onChange={(e) => setNewCellLine({...newCellLine, name: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                  <div>
                    <Label htmlFor="type" className="text-slate-200">Type</Label>
                    <Select value={newCellLine.type} onValueChange={(value) => setNewCellLine({...newCellLine, type: value})}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select cell type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="Immortalized" className="text-white">Immortalized</SelectItem>
                        <SelectItem value="Cancer Cell Line" className="text-white">Cancer Cell Line</SelectItem>
                        <SelectItem value="Primary Culture" className="text-white">Primary Culture</SelectItem>
                        <SelectItem value="Endothelial" className="text-white">Endothelial</SelectItem>
                        <SelectItem value="Fibroblast" className="text-white">Fibroblast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">  
                {/* to be separate function */}
                {/* <div>
                  <Label htmlFor="edit-passage" className="text-slate-200">Passage #</Label>
                  <Input
                    id="edit-passage"
                    type="number"
                    value={newCellLine.passage}
                    onChange={(e) => setNewCellLine({...newCellLine, passage: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div> */}
                <div>
                    <Label htmlFor="edit-medium" className="text-slate-200">Culture Medium</Label>
                    <Select value={newCellLine.medium} onValueChange={(value) => setNewCellLine({...newCellLine, medium: value})}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select medium" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="DMEM" className="text-white">DMEM</SelectItem>
                        <SelectItem value="RPMI" className="text-white">RPMI</SelectItem>
                        <SelectItem value="EGM-2" className="text-white">EGM-2</SelectItem>
                        <SelectItem value="Custom" className="text-white">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div>
                  <Label htmlFor="edit-confluence" className="text-slate-200">Confluence %</Label>
                  <Input
                    id="edit-type"
                    type="number"
                    min="0"
                    max="100"
                    value={newCellLine.confluence}
                    onChange={(e) => setNewCellLine({...newCellLine, confluence: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* /REPORTERS EDITTING */}
              <div className="grid grid-cols-2 gap-4">  
                <div>
                  <Label htmlFor="edit-add-reporter" className="text-slate-200">Add Reporter</Label>
                  {/* Add reporter dropdown - only show if less than 3 reporters */}
                  {newCellLine.reporters.length < 10 && (
                    <Select 
                      value="" 
                      onValueChange={(value) => {
                        if (value && !newCellLine.reporters.includes(value)) {
                          setNewCellLine({
                            ...newCellLine, 
                            reporters: [...newCellLine.reporters, value]
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white"></SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="Luciferase" className="text-white">Luciferase</SelectItem>
                        <SelectItem value="GFP" className="text-white">GFP</SelectItem>
                        <SelectItem value="RFP" className="text-white">RFP</SelectItem>
                        <SelectItem value="NFKB" className="text-white">NFKB</SelectItem>
                        <SelectItem value="mCherry" className="text-white">mCherry</SelectItem>
                        <SelectItem value="YFP" className="text-white">YFP</SelectItem>
                        <SelectItem value="BFP" className="text-white">BFP</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  {newCellLine.reporters.length >= 10 && (
                    <p className="text-xs text-slate-400">Maximum of 10 reporters allowed</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="edit-reporters" className="text-slate-200">Reporters</Label>
                  <div className="space-y-2">
                    {/* Current reporters display */}
                    <div className="flex flex-wrap gap-1 min-h-[32px] p-2 bg-slate-700/50 border border-slate-600 rounded-md">
                      {newCellLine.reporters.length > 0 ? (
                        newCellLine.reporters.map((reporter, idx) => (
                          <Badge 
                            key={idx} 
                            className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs flex items-center gap-1"
                          >
                            {reporter}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedReporters = newCellLine.reporters.filter((_, i) => i !== idx);
                                setNewCellLine({...newCellLine, reporters: updatedReporters});
                              }}
                              className="ml-1 text-purple-200 hover:text-white"
                            >
                              ×
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-slate-400 text-sm">No reporters selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-notes" className="text-slate-200">Notes</Label>
                  <Input
                    id="edit-notes"
                    value={newCellLine.notes}
                    maxLength={50}
                    onChange={(e) => setNewCellLine({...newCellLine, notes: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <Button onClick={handleUpdateCellLine} className="w-full bg-purple-800 hover:bg-purple-600">
                Update Cell Line
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      {/* Pass Cells Dialog */}
      <Dialog open={isPassDialogOpen} onOpenChange={setIsPassDialogOpen}>
        <DialogContent className="max-w-2xl bg-slate-800/95 backdrop-blur-md border-slate-600">
          <DialogHeader>
            <DialogTitle className="text-white">Pass Cell Lines</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-200 text-sm">
              Select cell lines to perform passage. This will increment passage # and reset Confluence to 10%
            </p>
            
            {/* Cell Selection List */}
            <div className="max-h-60 overflow-y-auto border border-slate-600 rounded-lg">
              {cellLines.map((cell) => (
                <div 
                  key={cell.id} 
                  className="flex items-center justify-between p-3 border-b border-slate-600/50 last:border-b-0 hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCellsForPassage.includes(cell.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCellsForPassage([...selectedCellsForPassage, cell.id]);
                        } else {
                          setSelectedCellsForPassage(selectedCellsForPassage.filter(id => id !== cell.id));
                        }
                      }}
                      // color change!!
                      className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-orange-500 focus:ring-orange-400"
                    />
                    <div>
                      <div className="text-white font-medium">{cell.name}</div>
                      <div className="text-xs text-slate-400">
                        P{cell.passage} • {cell.confluence}% confluence • {getDaysSincePassage(cell.lastPassageDate)} days ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(cell.status)}
                    <Badge className={getTimeBadgeVariant(getDaysSincePassage(cell.lastPassageDate))}>
                      {getDaysSincePassage(cell.lastPassageDate)}d
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCellsForPassage(cellLines.map(c => c.id))}
                className="text-blue-300 hover:bg-white/10"
              >
                Select All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCellsForPassage([])}
                className="text-blue-300 hover:bg-white/10"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCellsForPassage(
                  cellLines.filter(c => c.status === 'ready-passage' || getDaysSincePassage(c.lastPassageDate) > 6)
                    .map(c => c.id)
                )}
                className="text-orange-300 hover:bg-white/10"
              >
                Select Ready
              </Button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => {
                  setIsPassDialogOpen(false);
                  setSelectedCellsForPassage([]);
                }}
                variant="ghost" 
                className="flex-1 text-slate-300 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePassSelectedCells}
                disabled={selectedCellsForPassage.length === 0}
                className="flex-1 bg-purple-800 hover:bg-purple-600 disabled:opacity-50"
              >
                Pass {selectedCellsForPassage.length} Cell Line{selectedCellsForPassage.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>
  );
}

export default CellTrackingPage;
