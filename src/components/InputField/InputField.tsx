import { capFirstLetter } from '@utils/functions';

type Props = {
  label: string;
  name: string;
  register: any;
  errors: any;
};

const InputField = ({ name, label, register, errors }: Props) => {
  return (
    <div className="flex flex-col mt-6 mb-6 w-full text-primary">
      <label htmlFor="name" className="font-semibold block">
        {capFirstLetter(name)}
      </label>
      <input
        type="text"
        id={label}
        placeholder={`Enter ${name}`}
        {...register(label, { required: true })}
        className={`text-primary placeholder-primary placeholder-opacity-35 rounded-lg px-3 py-2 font-semibold block outline-none border ${
          errors[label] ? 'border-red-500' : ''
        }`}
      />
      {errors[label] && <span className="text-sm">{errors[label].message}</span>}
    </div>
  );
};

export default InputField;
