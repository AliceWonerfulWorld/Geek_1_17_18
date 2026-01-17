'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS } from '@/lib/constants';
import { DiagnosticAnswers, STORAGE_KEY } from '@/types/diagnosis';
import QuestionCard from '@/components/diagnostic/QuestionCard';
import Button from '@/components/common/Button';
import LayoutContainer from '@/components/common/LayoutContainer';

export default function DiagnosticPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<DiagnosticAnswers>(() => {
    const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      try {
        return JSON.parse(savedAnswers);
      } catch (error) {
        console.error('Failed to parse saved answers:', error);
      }
    }
    return {};
  });

  // 回答が変更されるたびにsessionStorageに保存
  const handleAnswerChange = (questionId: number, value: number) => {
    const newAnswers = {
      ...answers,
      [`q${questionId}`]: value,
    };
    setAnswers(newAnswers);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
  };

  // 全問回答済みかチェック
  const isAllAnswered = QUESTIONS.every((q) => answers[`q${q.id}`] !== undefined);

  // 診断結果画面へ遷移
  const handleSubmit = () => {
    if (!isAllAnswered) return;
    router.push('/result');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <LayoutContainer>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            診断質問
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            すべての質問に回答してください（{Object.keys(answers).length}/{QUESTIONS.length}）
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {QUESTIONS.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={index + 1}
              selectedValue={answers[`q${question.id}`]}
              onChange={handleAnswerChange}
            />
          ))}
        </div>

        <div className="sticky bottom-0 bg-gray-50 dark:bg-black py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              size="lg"
            >
              {isAllAnswered ? '診断する' : `残り ${QUESTIONS.length - Object.keys(answers).length} 問`}
            </Button>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
