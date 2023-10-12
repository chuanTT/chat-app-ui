import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { FaCamera } from "react-icons/fa"

interface ImagesUploadFieldProps {
  classWapper?: string
  defaultSrc?: string
  classParentImg?: string
  register?: UseFormRegister<FieldValues>
  name: string
  validType?: string[]
  msgSize?: string
  sizeFile?: number
  msgType?: string
  setValue?: UseFormSetValue<FieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldError?: any
}

const ImagesUploadField: FC<ImagesUploadFieldProps> = ({
  register,
  name,
  msgSize = "Không được vượt quá định dạng",
  sizeFile = 5,
  validType = ["image/jpg", "image/jpeg", "image/png"],
  msgType = "File không đúng dịnh dạng",
  setFieldError,
  setValue
}) => {
  const dataFile = useRef(new DataTransfer())
  const InputFile = useRef<HTMLInputElement>(null)
  const [src, setSrc] = useState<string>("")

  useEffect(() => {
    return () => {
      src && URL.revokeObjectURL(src)
    }
  }, [src])

  const VaildateUploadFiles = (file: File | null | undefined, inputFile: HTMLInputElement) => {
    if (file) {
      if (validType && !validType.includes(file?.type as never)) {
        inputFile && (inputFile.value = "")
        typeof setFieldError === "function" && setFieldError(name, { type: "custom", message: msgType })
        return
      }
      const size = Number((file?.size / 1024 / 1024).toFixed(2))
      if (!(size <= Number(sizeFile))) {
        inputFile && (inputFile.value = "")
        typeof setFieldError === "function" && setFieldError(name, msgSize || "Dung dượng file vượt quá giới hạn")
        return
      }
      dataFile.current.items.clear()
      dataFile.current.items.add(file)
      inputFile && (inputFile.files = dataFile.current.files)
    } else if (dataFile.current.files.length > 0 && inputFile) {
      file = dataFile.current.files[0]
      inputFile.files = dataFile.current.files
    }

    let preview = ""
    if (file) {
      preview = URL.createObjectURL(file)
    }

    return preview
  }

  const handelPreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const file = e.target?.files?.[0]
      const src = VaildateUploadFiles(file, e.target)
      typeof setValue === "function" && setValue(name, e.target?.files?.[0])
      setSrc(src ?? "")
    }
  }

  return (
    <div className="w-28 h-28 rounded-full mx-auto relative overflow-hidden group">
      <img
        src={src || "https://api.chuandinh.click/avatar/default/male_3.png"}
        alt="img"
        className="w-28 h-28 rounded-full object-cover mx-auto"
      />

      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 select-none absolute top-0 left-0 right-0 bottom-0 bg-[#6b72804a] z-10 flex items-center justify-center">
        <FaCamera
          size={25}
          className="cursor-pointer text-white"
          onClick={() => {
            if (InputFile.current) {
              InputFile.current.click()
            }
          }}
        />

        <input
          id={name}
          type="file"
          className="!hidden"
          {...register?.(name)}
          onChange={handelPreview}
          ref={InputFile}
        />
      </div>
    </div>
  )
}

export default ImagesUploadField
