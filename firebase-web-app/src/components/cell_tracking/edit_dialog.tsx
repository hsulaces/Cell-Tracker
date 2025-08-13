import { CellLineFormState } from '../../types/cellLine';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface EditDialogProps {
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    newCellLine: CellLineFormState;
    setNewCellLine: (cell: CellLineFormState) => void;
    handleUpdateCellLine: () => void;
}

export const EditCellLineDialog = ({ isEditDialogOpen, setIsEditDialogOpen, newCellLine, setNewCellLine, handleUpdateCellLine }: EditDialogProps) => {
    return (
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
    );
};
