'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

interface ScoreAnimationProps {
    score: number;
    className?: string;
}

export default function ScoreAnimation({ score, className = '' }: ScoreAnimationProps) {
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        // コンポーネントマウント後にアニメーション開始
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={className}>
            {startAnimation ? (
                <CountUp
                    start={0}
                    end={score}
                    duration={2}
                    separator=""
                />
            ) : (
                <span>0</span>
            )}
        </div>
    );
}
