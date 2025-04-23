interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: e: React.ChangeEvent<HTMLInputElement> => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function TextField{
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  error,
}: TextFieldProps {
  return 
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  ;
}
