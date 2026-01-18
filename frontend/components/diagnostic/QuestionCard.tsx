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
      <div className="mb-6">
        <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] block mb-2">
          QUESTION {questionNumber}
        </span>
        <p className="text-lg font-bold text-zinc-800 leading-relaxed">
          {question.text}
        </p>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between text-xs font-bold text-zinc-400 mb-4 px-2">
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
