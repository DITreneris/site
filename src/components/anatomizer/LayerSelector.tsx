import ExclusiveChoiceGroup from '../shared/ExclusiveChoiceGroup';
import type { AnatomyOption } from '../../types';

interface LayerSelectorProps {
  label: string;
  options: AnatomyOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function LayerSelector({
  label,
  options,
  selectedIndex,
  onSelect,
}: LayerSelectorProps) {
  return (
    <div className="card-light space-y-2">
      <ExclusiveChoiceGroup
        legend={label}
        value={selectedIndex}
        onChange={onSelect}
        columns={3}
        options={options.map((option) => ({
          id: option.title,
          label: option.title,
        }))}
      />
    </div>
  );
}
