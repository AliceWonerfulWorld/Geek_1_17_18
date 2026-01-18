'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { AxisDetail } from '@/types/diagnosis';

interface CompatibilityRadarChartProps {
    axisDetails: AxisDetail[];
}

export default function CompatibilityRadarChart({ axisDetails }: CompatibilityRadarChartProps) {
    // レーダーチャート用のデータ変換
    const chartData = axisDetails.map(detail => ({
        axis: detail.axisName,
        Aさん: detail.scoreA,
        Bさん: detail.scoreB,
    }));

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                        dataKey="axis"
                        tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    <Radar
                        name="Aさん"
                        dataKey="Aさん"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                        strokeWidth={2}
                    />
                    <Radar
                        name="Bさん"
                        dataKey="Bさん"
                        stroke="#ec4899"
                        fill="#ec4899"
                        fillOpacity={0.5}
                        strokeWidth={2}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
