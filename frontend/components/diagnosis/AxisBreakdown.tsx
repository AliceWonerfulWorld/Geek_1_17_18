'use client';

import { AxisDetail } from '@/types/diagnosis';

interface AxisBreakdownProps {
    axisDetails: AxisDetail[];
}

export default function AxisBreakdown({ axisDetails }: AxisBreakdownProps) {
    // 一致度に応じたアイコンとメッセージを取得
    const getCompatibilityInfo = (compatibility: number) => {
        if (compatibility >= 80) {
            return { icon: '✓', color: 'text-green-600', bgColor: 'bg-green-50', message: 'とても一致しています' };
        } else if (compatibility >= 60) {
            return { icon: '○', color: 'text-blue-600', bgColor: 'bg-blue-50', message: '一致しています' };
        } else if (compatibility >= 40) {
            return { icon: '△', color: 'text-yellow-600', bgColor: 'bg-yellow-50', message: 'やや異なります' };
        } else {
            return { icon: '⚠', color: 'text-red-600', bgColor: 'bg-red-50', message: '異なります' };
        }
    };

    return (
        <div className="space-y-4">
            {axisDetails.map((detail) => {
                const info = getCompatibilityInfo(detail.compatibility);

                return (
                    <div key={detail.axis} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className={`text-2xl ${info.color}`}>{info.icon}</span>
                                <h4 className="font-black text-gray-900">{detail.axisName}</h4>
                            </div>
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${info.bgColor} ${info.color}`}>
                                {info.message}
                            </span>
                        </div>

                        {/* 一致度バー */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>一致度</span>
                                <span className="font-bold">{detail.compatibility}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-1000 ${detail.compatibility >= 80 ? 'bg-green-500' :
                                            detail.compatibility >= 60 ? 'bg-blue-500' :
                                                detail.compatibility >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${detail.compatibility}%` }}
                                />
                            </div>
                        </div>

                        {/* スコア比較 */}
                        <div className="flex gap-4 text-sm">
                            <div className="flex-1">
                                <div className="text-gray-500 mb-1">Aさん</div>
                                <div className="font-bold text-blue-600">{detail.scoreA}点</div>
                            </div>
                            <div className="flex-1">
                                <div className="text-gray-500 mb-1">Bさん</div>
                                <div className="font-bold text-pink-600">{detail.scoreB}点</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
