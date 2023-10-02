import { FC, useEffect } from "react"
import { toast, ToastOptions } from "react-toastify"

const ToastCustom: FC<ToastCustomProps> = ({ children, title, isOpenToast, type, timeEnd, CloseEvent, ...option }) => {
  useEffect(() => {
    const options: ToastOptions = {
      ...option,
      position: "top-right",
      autoClose: timeEnd || 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        typeof CloseEvent === "function" && CloseEvent()
      }
    }

    if (isOpenToast) {
      if (title) {
        switch (type) {
          case "success":
            toast.success(title, options)
            break
          case "error":
            toast.error(title, options)
            break
          case "warn":
            toast.warn(title, options)
            break
          default:
            break
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenToast])

  return <>{children}</>
}
export default ToastCustom
