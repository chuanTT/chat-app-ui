import { FC, HTMLAttributes, TextareaHTMLAttributes } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLElement> {
  title?: string
  name: string
  register: UseFormRegister<FieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any
  classAreaContainer?: HTMLAttributes<HTMLElement>["className"]
  isRequire?: boolean
}

const TextArea: FC<TextAreaProps> = ({ title, name, register, errors, classAreaContainer, isRequire, ...rest }) => {
  return (
    <div className={`${classAreaContainer ?? ""}`}>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        className="bg-gray-50 border outline-none resize-none border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5"
        autoComplete="off"
        id={name}
        {...register(name)}
        {...rest}
      ></textarea>
      {errors?.[name]?.message && (
        <span className="mt-2 block text-sm text-red-600 dark:text-red-500">{errors?.[name]?.message}</span>
      )}
    </div>
  )
}

export default TextArea
