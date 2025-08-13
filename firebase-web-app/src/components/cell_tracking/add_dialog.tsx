import { CellLineFormState } from '../../types/cellLine';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface AddDialogProps {
    isAddDialogOpen: boolean;
    setIsAddDialogOpen: (open: boolean) => void;
    newCellLine: CellLineFormState;
    setNewCellLine: (cell: CellLineFormState) => void;
    handleAddCellLine: () => void;
}

export const AddCellLineDialog = ({ isAddDialogOpen, setIsAddDialogOpen, newCellLine, setNewCellLine, handleAddCellLine }: AddDialogProps) => {
    return (
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
    );
};