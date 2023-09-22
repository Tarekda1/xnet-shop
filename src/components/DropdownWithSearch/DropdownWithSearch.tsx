import React from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

type DropDownComponentProps = {
  value: string;
  label: string;
  id?: string;
  fieldName: string;
  setValue: (name: string, value: any) => void;
  getValue: (name: string) => string;
  data: [any];
} & any;

const DropdownWithSearch: React.FC<DropDownComponentProps> = ({
  data,
  setValue,
  fieldName,
  getValue,
  onChange,
}) => {
  const handleChange = (
    selectedOption: SingleValue<string>,
    action: ActionMeta<string>
  ) => {
    setValue(fieldName, selectedOption);
    onChange(selectedOption);
  };

  return (
    <div>
      <Select
        value={getValue(fieldName)}
        className="mt-1 border border-gray-300 rounded w-full"
        onChange={handleChange}
        options={data}
        isSearchable={true}
        placeholder="Search and select..."
      />
    </div>
  );
};

export default DropdownWithSearch;
