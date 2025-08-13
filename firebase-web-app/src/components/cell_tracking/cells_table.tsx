import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { CellLine } from '../../types/cellLine';
import { Edit, Trash2, CalendarDays } from 'lucide-react';

interface CellLinesTableProps {
    cellLines: CellLine[];
    onEdit: (cell: CellLine) => void;
    onDelete: (id: number) => void;
    onPassCells: () => void;
    getDaysSincePassage: (date: string) => number;
    getStatusBadge: (status: string) => JSX.Element;
    getTimeBadgeVariant: (days: number) => string;
    getMediumColor: (medium: string) => string;
}

export const CellsTable = ({cellLines, onEdit, onDelete, onPassCells, getDaysSincePassage, 
                            getStatusBadge, getTimeBadgeVariant, getMediumColor
                        }: CellLinesTableProps) => {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
        
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-white mb-4">Cell Lines Overview</h3>
            <Button 
                className="flex items-center gap-2 bg-purple-800 hover:bg-purple-600 text-white shadow-lg"
                onClick={onPassCells}
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
                            onClick={() => onEdit(cellLine)}
                            className="text-blue-300 hover:bg-white/10"
                            >
                            <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(cellLine.id)}
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
    );
};
