'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QUESTIONS } from '@/lib/questions';
import { DiagnosticAnswers, STORAGE_KEY, RESULT_STORAGE_KEY, ANSWERS_A_KEY, ANSWERS_B_KEY, MODE_KEY, CURRENT_PERSON_KEY } from '@/types/diagnosis';
import QuestionCard from '@/components/diagnostic/QuestionCard';
import Button from '@/components/common/Button';
import LayoutContainer from '@/components/common/LayoutContainer';
import { submitDiagnosis, submitCompatibility } from '@/lib/api';

function DiagnosticContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); // 'two' or null
  const isTwoPersonMode = mode === 'two';

  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<'A' | 'B'>('A'); // 2人モード時の現在回答者

  // マウント後にsessionStorageから読み込む（クライアントサイドのみ）
  useEffect(() => {
    if (isTwoPersonMode) {
      // 2人モード：現在の回答者を確認
      const savedPerson = sessionStorage.getItem(CURRENT_PERSON_KEY) as 'A' | 'B' | null;
      if (savedPerson) {
        setCurrentPerson(savedPerson);

        // 現在の回答者の回答を読み込む
        const key = savedPerson === 'A' ? ANSWERS_A_KEY : ANSWERS_B_KEY;
        const savedAnswers = sessionStorage.getItem(key);
        if (savedAnswers) {
          try {
            setAnswers(JSON.parse(savedAnswers));
          } catch (error) {
            console.error('Failed to parse saved answers:', error);
          }
        }
      } else {
        // 初回アクセス：Aさんから開始
        sessionStorage.setItem(CURRENT_PERSON_KEY, 'A');
        sessionStorage.setItem(MODE_KEY, 'two');
      }
    } else {
      // 1人モード：既存の動作
      sessionStorage.setItem(MODE_KEY, 'one'); // 1人モードを明示的に保存
      const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
        } catch (error) {
          console.error('Failed to parse saved answers:', error);
        }
      }
    }
  }, [isTwoPersonMode]);

  // 回答が変更されるたびにsessionStorageに保存
  const handleAnswerChange = (questionId: string | number, value: number) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(newAnswers);

    if (isTwoPersonMode) {
      // 2人モード：現在の回答者用のキーに保存
      const key = currentPerson === 'A' ? ANSWERS_A_KEY : ANSWERS_B_KEY;
      sessionStorage.setItem(key, JSON.stringify(newAnswers));
    } else {
      // 1人モード：既存のキーに保存
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
    }
  };

  // 全問回答済みかチェック
  const isAllAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  // 次の人へ（2人モード専用）
  const handleNextPerson = () => {
    if (!isAllAnswered) return;

    // Aさんの回答完了 → Bさんへ
    setCurrentPerson('B');
    sessionStorage.setItem(CURRENT_PERSON_KEY, 'B');

    // 回答フォームをリセット
    setAnswers({});

    // Bさんの回答があれば読み込む（戻ってきた場合）
    const savedAnswersB = sessionStorage.getItem(ANSWERS_B_KEY);
    if (savedAnswersB) {
      try {
        setAnswers(JSON.parse(savedAnswersB));
      } catch (error) {
        console.error('Failed to parse saved answers B:', error);
      }
    }
    // スクロールをトップに戻す
    document.documentElement.scrollTop = 0;
  };

  // 診断結果画面へ遷移
  const handleSubmit = async () => {
    if (!isAllAnswered || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isTwoPersonMode) {
        // 2人モード：相性診断API呼び出し
        const answersAStr = sessionStorage.getItem(ANSWERS_A_KEY);
        const answersBStr = sessionStorage.getItem(ANSWERS_B_KEY);

        if (!answersAStr || !answersBStr) {
          throw new Error('回答データが見つかりません');
        }

        const answersAData = JSON.parse(answersAStr);
        const answersBData = JSON.parse(answersBStr);

        // 回答データを整形
        const requestAnswersA = {
          q1: answersAData['q1'],
          q2: answersAData['q2'],
          q3: answersAData['q3'],
          q4: answersAData['q4'],
          q5: answersAData['q5'],
          q6: answersAData['q6'],
          q7: answersAData['q7'],
          q8: answersAData['q8'],
          q9: answersAData['q9'],
          q10: answersAData['q10'],
        };

        const requestAnswersB = {
          q1: answersBData['q1'],
          q2: answersBData['q2'],
          q3: answersBData['q3'],
          q4: answersBData['q4'],
          q5: answersBData['q5'],
          q6: answersBData['q6'],
          q7: answersBData['q7'],
          q8: answersBData['q8'],
          q9: answersBData['q9'],
          q10: answersBData['q10'],
        };

        // 相性診断API呼び出し
        const result = await submitCompatibility(requestAnswersA, requestAnswersB);

        // 診断結果をsessionStorageに保存
        sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));

        // 2人モード用のsessionStorageをクリア（MODE_KEYは残す）
        sessionStorage.removeItem(ANSWERS_A_KEY);
        sessionStorage.removeItem(ANSWERS_B_KEY);
        sessionStorage.removeItem(CURRENT_PERSON_KEY);

        // 結果画面へ遷移
        router.push('/result');
      } else {
        // 1人モード：既存の診断API呼び出し
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
      }
    } catch (error) {
      console.error('診断APIの呼び出しに失敗しました:', error);
      alert('診断に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // タイトルとボタンテキストを決定
  const getTitle = () => {
    if (isTwoPersonMode) {
      return currentPerson === 'A' ? 'Aさんの回答' : 'Bさんの回答';
    }
    return '診断質問';
  };

  const getButtonText = () => {
    if (isSubmitting) return '送信中...';
    if (!isAllAnswered) return `残り ${QUESTIONS.length - Object.keys(answers).length} 問`;

    if (isTwoPersonMode && currentPerson === 'A') {
      return '次はBさん';
    }
    return '診断する';
  };

  const handleButtonClick = () => {
    if (isTwoPersonMode && currentPerson === 'A') {
      handleNextPerson();
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] font-sans text-zinc-800 py-12 px-4">
      <LayoutContainer maxWidth="2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-zinc-900 mb-4 sm:text-4xl">
            {getTitle()}
          </h1>
          <div className="inline-block rounded-full bg-white px-6 py-2 border-2 border-zinc-50 shadow-sm">
            <p className="text-zinc-600 font-bold">
              すべての質問に回答してください
              <span className="ml-2 text-blue-600">
                ({Object.keys(answers).length}/{QUESTIONS.length})
              </span>
            </p>
          </div>
          {isTwoPersonMode && (
            <div className="mt-4">
              <span className="inline-block bg-blue-100 text-blue-700 font-black px-4 py-1 rounded-full text-sm">
                {currentPerson === 'A' ? '🐴 Aさんのターン' : '🐴 Bさんのターン'}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-8 mb-32">
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

        <div className="fixed bottom-0 left-0 right-0 bg-[#FFFBEB]/90 backdrop-blur-sm py-6 border-t-2 border-dashed border-zinc-200 z-10">
          <div className="max-w-2xl mx-auto px-4 flex justify-center">
            <div className="w-full max-w-sm">
              <Button
                onClick={handleButtonClick}
                disabled={!isAllAnswered || isSubmitting}
                size="lg"
                className="w-full text-xl shadow-[0_6px_0_0_#1e40af]"
              >
                {getButtonText()}
              </Button>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}

export default function DiagnosticPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFBEB] py-12 px-4 flex items-center justify-center">
        <div className="text-zinc-600 font-bold animate-pulse">読み込み中...</div>
      </div>
    }>
      <DiagnosticContent />
    </Suspense>
  );
}
