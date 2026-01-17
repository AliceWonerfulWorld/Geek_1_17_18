import { Question } from '@/types/diagnosis';
import Card from '@/components/common/Card';
import ScaleSelector from './ScaleSelector';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedValue: number | undefined;
  onChange: (questionId: string | number, value: number) => void;
}

//質問番号・質問文・評価ボタンをまとめて表示するカードコンポーネント
export default function QuestionCard({
  question,
  questionNumber,
  selectedValue,
  onChange,
}: QuestionCardProps) {
  return (
    <Card>
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Q{questionNumber}
        </span>
        <p className="mt-2 text-lg text-gray-900 dark:text-gray-100">
          {question.text}
        </p>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 px-1">
          <span>あてはまらない</span>
          <span>あてはまる</span>
        </div>
        <ScaleSelector
          questionId={question.id}
          selectedValue={selectedValue}
          onChange={onChange}
        />
      </div>
    </Card>
  );
}
