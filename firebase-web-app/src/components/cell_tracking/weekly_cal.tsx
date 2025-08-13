import { useState } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Plus, Edit, Trash2, TrendingUp, Activity, AlertTriangle, CalendarDays, ChevronLeft, ChevronRight} from 'lucide-react';

interface WeeklyCallProps {
    cellLines: any[]
}

export const WeeklyCal = ({ cellLines }: WeeklyCallProps) => {
    //creating skeleton componenet of custon weekly calendar
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - dayOfWeek);
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek;
    });
    
    const getWeekDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
        const day = new Date(currentWeekStart);
        day.setDate(currentWeekStart.getDate() + i);
        days.push(day);
        }
        return days;
    };

    const getPassageDatesForWeek = () => {
        const passageDates: { [key: string]: any[] } = {};
        
        cellLines.forEach(cell => {
        const lastPassage = new Date(cell.lastPassageDate);
        const estimatedNext = new Date(lastPassage);
        estimatedNext.setDate(lastPassage.getDate() + 7); // assume a 7-day cycle
        
        const weekDays = getWeekDays();
        weekDays.forEach(day => {
            if (estimatedNext.toDateString() === day.toDateString()) {
            const dayKey = day.toDateString();
            if (!passageDates[dayKey]) {
                passageDates[dayKey] = [];
            }
            passageDates[dayKey].push(cell);
            }
        });
        });
        
        return passageDates;
    };

    const getWorkloadColor = (cellCount: number) => {
        if (cellCount === 0) return 'bg-white/5';
        if (cellCount === 1) return 'bg-green-500/20 border-green-500/30';
        if (cellCount === 2) return 'bg-yellow-500/20 border-yellow-500/30';
        return 'bg-red-500/20 border-red-500/30';
    };
    
    const navigateWeek = (direction: 'prev' | 'next') => {
        setCurrentWeekStart(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
            newDate.setDate(prev.getDate() - 7);
        } else {
            newDate.setDate(prev.getDate() + 7);
        }
        return newDate;
        });
    };

        const weekDays = getWeekDays();
    const passageDates = getPassageDatesForWeek();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const formatWeekRange = () => {
        const endOfWeek = new Date(currentWeekStart);
        endOfWeek.setDate(currentWeekStart.getDate() + 6);
        
        const startMonth = currentWeekStart.toLocaleDateString('en-US', { month: 'short' });
        const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
        const year = currentWeekStart.getFullYear();
        
        if (startMonth === endMonth) {
        return `${startMonth} ${currentWeekStart.getDate()}-${endOfWeek.getDate()}, ${year}`;
        } else {
        return `${startMonth} ${currentWeekStart.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${year}`;
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Weekly Passage Schedule</h3>
            <div className="flex items-center gap-3">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateWeek('prev')}
                className="text-white hover:bg-white/10"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-white font-medium min-w-[200px] text-center">
                {formatWeekRange()}
            </span>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateWeek('next')}
                className="text-white hover:bg-white/10"
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
            </div>
        </div>
        
        <div className="grid grid-cols-7 gap-3">
            {weekDays.map((day, index) => {
            const dayKey = day.toDateString();
            const cellsForDay = passageDates[dayKey] || [];
            const isToday = day.toDateString() === today.toDateString();
            const isPast = day < today;
            
            return (
                <div
                key={dayKey}
                className={`
                    h-32 p-3 rounded-lg border transition-all
                    ${isToday ? 'ring-2 ring-blue-400 bg-blue-500/10' : ''}
                    ${isPast ? 'opacity-60' : ''}
                    ${getWorkloadColor(cellsForDay.length)}
                    ${cellsForDay.length > 0 ? 'border-white/30' : 'border-white/10'}
                    hover:bg-white/10
                `}
                >
                <div className="flex flex-col h-full">
                    <div className="flex-shrink-0 mb-2">
                    <div className="text-blue-200 text-xs font-medium">{shortDayNames[index]}</div>
                    <div className={`text-lg font-medium ${isToday ? 'text-blue-300' : 'text-white'}`}>
                        {day.getDate()}
                    </div>
                    </div>
                    
                    <div className="flex-1 space-y-1 overflow-hidden">
                    {cellsForDay.map((cell, idx) => (
                        <div
                        key={idx}
                        className="text-xs bg-blue-500/30 text-blue-100 px-2 py-1 rounded-md truncate"
                        title={`${cell.name} - Passage ${cell.passage + 1}`}
                        >
                        <div className="font-medium">{cell.name}</div>
                        <div className="text-[10px] opacity-80">P{cell.passage + 1}</div>
                        </div>
                    ))}
                    
                    {cellsForDay.length > 3 && (
                        <div className="text-[10px] text-blue-200 text-center">
                        +{cellsForDay.length - 3} more
                        </div>
                    )}
                    
                    {cellsForDay.length === 0 && (
                        <div className="text-[10px] text-slate-400 text-center mt-4">
                        No passages
                        </div>
                    )}
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-blue-200">
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30"></div>
                <span>Light (1)</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/30"></div>
                <span>Moderate (2)</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30"></div>
                <span>Heavy (3+)</span>
            </div>
            </div>
            
            <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentWeekStart(() => {
                const now = new Date();
                const dayOfWeek = now.getDay();
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - dayOfWeek);
                startOfWeek.setHours(0, 0, 0, 0);
                return startOfWeek;
            })}
            className="text-blue-300 hover:bg-white/10 text-xs"
            >
            Today
            </Button>
        </div>
        </div>
    );
};


