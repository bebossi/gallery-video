export type Option = {
  label: string;
  value: string;
};

export type FilterOption = {
  key: string;
  label: string;
  options?: Option[];
  getOptions?: (selectedType: string) => Option[];
  selectedOption?: string;
  onSelect?: (value: string) => void;
};
