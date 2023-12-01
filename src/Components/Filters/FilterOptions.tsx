interface FilterOptionsProps {
  selectedOption?: string;
  key: string;
  label: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}
const FilterOptions: React.FC<FilterOptionsProps> = ({
  label,
  options,
  onSelect,
  selectedOption,
}) => {
  return (
    <div>
      <h2 className="mb-[1rem] border-b pb-[0.75rem] ">{label}</h2>
      <ul className="flex flex-col gap-y-[1rem]">
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`hover:cursor-pointer p-1 ${
              selectedOption === option.value
                ? 'bg-cyan-900 rounded-3xl text-center'
                : ''
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterOptions;
