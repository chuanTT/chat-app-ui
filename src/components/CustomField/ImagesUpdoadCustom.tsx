import { ChangeEvent, ForwardedRef, useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"

const ImagesUpload = (
  {
    name,
    sizeFile = 5,
    validType = ["image/jpg", "image/jpeg", "image/png"],
    children,
    onChangeFile
  }: ImagesUploadCustomType,
  ref: ForwardedRef<refImageCus>
) => {
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
        return
      }
      const size = Number((file?.size / 1024 / 1024).toFixed(2))
      if (!(size <= Number(sizeFile))) {
        inputFile && (inputFile.value = "")
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
    onChangeFile && onChangeFile(preview)

    return preview
  }

  const handelPreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const file = e.target?.files?.[0]
      const src = VaildateUploadFiles(file, e.target)
      setSrc(src ?? "")
    }
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        getSrc: () => {
          return src
        },
        getFile: () => {
          return dataFile?.current?.files?.[0] || InputFile.current?.files?.[0]
        },

        clearImage: () => {
          setSrc("")
          InputFile.current && (InputFile.current.value = "")
          if (dataFile.current) {
            dataFile.current.items.clear()
          }
        },
        setImage: (src: string) => {
          setSrc(src)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [InputFile]
  )

  return (
    <div
      onClick={() => {
        if (InputFile.current) {
          InputFile.current.click()
        }
      }}
      aria-hidden="true"
    >
      {children}
      <input id={name} type="file" className="!hidden" name={name} onChange={handelPreview} ref={InputFile} />
    </div>
  )
}

const ImagesUploadCustom = forwardRef(ImagesUpload)

export default ImagesUploadCustom
