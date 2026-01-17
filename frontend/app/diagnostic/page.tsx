'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS } from '@/lib/questions';
import { DiagnosticAnswers, STORAGE_KEY, RESULT_STORAGE_KEY } from '@/types/diagnosis';
import QuestionCard from '@/components/diagnostic/QuestionCard';
import Button from '@/components/common/Button';
import LayoutContainer from '@/components/common/LayoutContainer';
import { submitDiagnosis } from '@/lib/api';

export default function DiagnosticPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // マウント後にsessionStorageから読み込む（クライアントサイドのみ）
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (error) {
        console.error('Failed to parse saved answers:', error);
      }
    }
  }, []);

  // 回答が変更されるたびにsessionStorageに保存
  const handleAnswerChange = (questionId: string, value: number) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(newAnswers);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
  };

  // 全問回答済みかチェック
  const isAllAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  // 診断結果画面へ遷移
  const handleSubmit = async () => {
    if (!isAllAnswered || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 回答データを整形
      const requestAnswers = {
        q1: answers['q1'],
        q2: answers['q2'],
        q3: answers['q3'],
        q4: answers['q4'],
        q5: answers['q5'],
        q6: answers['q6'],
        q7: answers['q7'],
        q8: answers['q8'],
        q9: answers['q9'],
        q10: answers['q10'],
      };

      // API呼び出し
      const result = await submitDiagnosis(requestAnswers);

      // 診断結果をsessionStorageに保存
      sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));

      // 結果画面へ遷移
      router.push('/result');
    } catch (error) {
      console.error('診断APIの呼び出しに失敗しました:', error);
      // エラーハンドリングは今回対応範囲外のため、ログ出力のみ
    } finally {
      setIsSubmitting(false);
    }
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
              selectedValue={answers[question.id]}
              onChange={handleAnswerChange}
            />
          ))}
        </div>

        <div className="sticky bottom-0 bg-gray-50 dark:bg-black py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!isAllAnswered || isSubmitting}
              size="lg"
            >
              {isSubmitting 
                ? '送信中...' 
                : isAllAnswered 
                  ? '診断する' 
                  : `残り ${QUESTIONS.length - Object.keys(answers).length} 問`
              }
            </Button>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
