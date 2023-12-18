import React, { ChangeEvent } from 'react';

export interface IInputWithLabelProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputWithLabel: React.FC<IInputWithLabelProps> = ({
  label,
  name,
  type,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={name}>
        {label} {required ? '*' : ''}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[30px]"
        required={required}
      />
    </div>
  );
};

export default InputWithLabel;
