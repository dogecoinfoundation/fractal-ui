import {
  Combobox,
  ComboboxContent,
  type ComboboxData,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "../kibo-ui/combobox";

type FilterableComboboxProps = {
  options: ComboboxData[];
  value?: string;
  setValue: (value: string) => void;
  loading: boolean;
  type: string;
  label: string;
};

export const FilterableCombobox = ({
  options,
  value,
  setValue,
  loading,
  type,
  label,
}: FilterableComboboxProps) => {
  return (
    <Combobox
      data={options}
      value={value || ""}
      onValueChange={(value: string) => setValue(value)}
      type={type}
    >
      <ComboboxTrigger className="w-full" label={label} disabled={loading} />
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxEmpty />
        <ComboboxList>
          <ComboboxGroup>
            {options.map((option) => (
              <ComboboxItem key={option.value} value={option.value}>
                {option.label}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
