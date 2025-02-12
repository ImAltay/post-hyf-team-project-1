'use client';
type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  onChange = () => {},
}) => (
  <div className='mb-4'>
    <label className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>
      {label}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline'
    />
  </div>
);

export default InputField;
