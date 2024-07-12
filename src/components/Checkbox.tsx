import React from 'react';

interface CheckboxProps {
  name: string;
  labelFor: string;
  checked: boolean;
  description: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, labelFor, checked, description, onChange }) => (
  <div className="checkbox">
    <label htmlFor={`${name}-${labelFor}`}>
      <input
        type="checkbox"
        checked={checked}
        name={labelFor}
        id={`${name}-${labelFor}`}
        onChange={onChange}
      />
      <span>{`[${checked ? 'X' : ' '}] ${description}`}</span>
    </label>
  </div>
);

export default Checkbox;
