import { FC, useState, useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import Images from "./Images"
import Button from "./Button"
import { MsgType, dateCheck } from "@/common/functions"
import { agreeInvite, deleleInvite, tableInvite } from "@/api/inviteApi"
import ToastCustom from "./ToastCustom"
import { tableFriends } from "@/api/userApi"

interface InviteItemProps {
  render: InviteResult
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeFuc?: any
}

const InviteItem: FC<InviteItemProps> = ({ render }) => {
  const [disabled, setDisabled] = useState({
    isDisabled: false,
    action: ""
  })
  const [isOpenToast, setIsOpenToast] = useState(false)
  const QueryClient = useQueryClient()

  const toastMsg = useRef<ToastConfig>({ title: "", type: "warn" })

  const resetFuc = () => {
    setIsOpenToast(true)
    setDisabled({
      isDisabled: false,
      action: ""
    })
  }

  const { mutate } = useMutation({
    mutationFn: (values: number) => {
      return disabled?.action === "delete" ? deleleInvite(values) : agreeInvite(values)
    },
    onError: () => {
      toastMsg.current = MsgType(disabled?.action === "delete" ? "Xóa thất bại" : "Lỗi không xác định")
      resetFuc()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      toastMsg.current = MsgType(context?.msg ?? "Xoá thành công", false)
      QueryClient.invalidateQueries([tableInvite])
      QueryClient.invalidateQueries([tableFriends])
      resetFuc()
    }
  })

  const handelDelete = () => {
    const owner_id = render?.user?.id
    if (owner_id) {
      setDisabled({
        isDisabled: true,
        action: "delete"
      })
      mutate(owner_id)
    }
  }

  const handelAgree = () => {
    const owner_id = render?.user?.id
    if (owner_id) {
      setDisabled({
        isDisabled: true,
        action: "agree"
      })
      mutate(owner_id)
    }
  }

  return (
    <ToastCustom
      CloseEvent={() => {
        setIsOpenToast(false)
      }}
      isOpenToast={isOpenToast}
      title={toastMsg.current.title}
      type={toastMsg.current.type}
    >
      <div className={`w-full flex justify-between items-center p-2 rounded-md`}>
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 relative">
            <Images src={render?.user?.avatar ?? ""} w={48} h={48} isRounded />
          </div>
          <div className="pl-3 text-left w-[calc(100%_-_48px)] truncate">
            <div className="mb-1 flex items-center justify-between gap-1">
              <p className="font-semibold whitespace-nowrap truncate">{render?.user?.full_name}</p>
              <span className="text-xs">{dateCheck(render?.created_at)}</span>
            </div>
            <div className="flex items-center gap-2 [&>*]:w-1/2">
              <Button
                size="sm"
                className="!font-bold"
                hiddenLoading
                isPending={disabled?.isDisabled}
                onClick={() => handelAgree()}
              >
                Đồng ý
              </Button>
              <Button
                hiddenLoading
                isPending={disabled?.isDisabled}
                onClick={() => handelDelete()}
                className="!bg-[#e4e6eb] !text-[#050b14] !border-[#e4e6eb] !font-bold hover:!bg-[#dcdee5]"
                size="sm"
              >
                Xóa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToastCustom>
  )
}

export default InviteItem
