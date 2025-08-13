import { useState } from 'react';
import { Plus, Edit, Trash2, TrendingUp, Activity, AlertTriangle} from 'lucide-react';

import { Card } from '../../ui/card';

interface OverviewCardsProps {
    cellLines: any[];
}

export const OverviewCards = ({ cellLines }: OverviewCardsProps) => {
    return (
    // {/* Overview Cards */}
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 py-4">
                <Card className="p-8 shadow-sm border bg-white/10 backdrop-blur-md border-white/20 rounded-xl">
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
        </div>
    );
}
