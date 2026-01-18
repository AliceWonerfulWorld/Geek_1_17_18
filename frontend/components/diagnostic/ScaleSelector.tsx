import Button from '@/components/common/Button';

interface ScaleSelectorProps {
  questionId: string | number;
  selectedValue: number | undefined;
  onChange: (questionId: string | number, value: number) => void;
}

//1-5の5段階評価を数字ボタンで選択するコンポーネント
export default function ScaleSelector({
  questionId,
  selectedValue,
  onChange,
}: ScaleSelectorProps) {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {ratings.map((rating) => {
        const isSelected = selectedValue === rating;
        return (
          <Button
            key={rating}
            type="button"
            variant={isSelected ? 'primary' : 'secondary'}
            onClick={() => onChange(questionId, rating)}
            className="w-12 h-12 sm:w-14 sm:h-14 p-0 text-lg sm:text-xl"
            aria-label={`評価: ${rating}`}
          >
            {rating}
          </Button>
        );
      })}
    </div>
  );
}
