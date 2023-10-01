import { FC, InputHTMLAttributes } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

export interface InputFieldPops extends InputHTMLAttributes<HTMLElement> {
  title?: string
  name: string
  register?: UseFormRegister<FieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any
  classInputContainer?: string
  isRequire?: boolean
}

const InputField: FC<InputFieldPops> = ({ title, name, register, errors, classInputContainer, isRequire, ...rest }) => {
  return (
    <div className={` ${classInputContainer ?? ""}`}>
      {title && (
        <label className="block mb-2 text-sm font-semibold text-gray-900" htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
        autoComplete="off"
        id={name}
        {...register?.(name)}
        type="text"
        {...rest}
      />
      {errors?.[name]?.message && (
        <span className="mt-2 block text-sm text-red-600 dark:text-red-500">{errors?.[name]?.message}</span>
      )}
    </div>
  )
}

export default InputField
