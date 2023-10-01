import { FC, useState } from "react"
// import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi"
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri"
import InputField, { InputFieldPops } from "./InputField"

interface InputPasswordProps extends InputFieldPops {
  isShowDefault?: boolean
}

const InputPassword: FC<InputPasswordProps> = ({
  title,
  isRequire,
  name,
  isShowDefault = false,
  ...rest
}): JSX.Element => {
  const [isShow, setIsShow] = useState(isShowDefault)

  return (
    <div>
      {title && (
        <label className="block mb-2 text-sm font-semibold text-gray-900" htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <InputField
          name={name}
          {...rest}
          type={`${isShow ? "text" : "password"}`}
          classInputContainer="[&>input]:pr-8"
        />
        <div
          className="absolute -top-[5px] translate-y-full right-2 [&>*]:cursor-pointer select-none"
          onClick={(): void => {
            setIsShow((prev) => !prev)
          }}
          aria-hidden="true"
        >
          {!isShow && <RiEyeFill />}
          {isShow && <RiEyeCloseLine />}
        </div>
      </div>
    </div>
  )
}

export default InputPassword
