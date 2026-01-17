import Button from '@/components/common/Button';

interface ScaleSelectorProps {
  questionId: number;
  selectedValue: number | undefined;
  onChange: (questionId: number, value: number) => void;
}

//1-5の5段階評価を数字ボタンで選択するコンポーネント
export default function ScaleSelector({
  questionId,
  selectedValue,
  onChange,
}: ScaleSelectorProps) {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-2 justify-center">
      {ratings.map((rating) => {
        const isSelected = selectedValue === rating;
        return (
          <Button
            key={rating}
            type="button"
            variant={isSelected ? 'primary' : 'secondary'}
            onClick={() => onChange(questionId, rating)}
            className="w-12 h-12 p-0"
            aria-label={`評価: ${rating}`}
          >
            {rating}
          </Button>
        );
      })}
    </div>
  );
}
