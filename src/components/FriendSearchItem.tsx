import { FC, useRef, useState } from "react"
import { FaUserPlus } from "react-icons/fa"
import { AiTwotoneMessage } from "react-icons/ai"
import { useMutation } from "@tanstack/react-query"

import Images from "./Images"
import Button from "./Button"
import { deleleInvite, inviteUser } from "@/api/inviteApi"
import { MsgType } from "@/common/functions"
import ToastCustom from "./ToastCustom"

const FriendSearchItem: FC<FriendSearchProps> = ({
  avatar,
  isOnline,
  fullName,
  onClickMesseage,
  is_invite,
  is_friends,
  id
}) => {
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isCheck, setIsCheck] = useState(is_invite)

  const toastMsg = useRef<ToastConfig>({ title: "", type: "warn" })

  const resetFuc = () => {
    setIsOpenToast(true)
    setIsDisabled(false)
  }

  const { mutate } = useMutation({
    mutationFn: (values: number) => {
      return isCheck ? deleleInvite(values) : inviteUser(values)
    },
    onError: () => {
      toastMsg.current = MsgType("Lỗi không xác định")
      resetFuc()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      toastMsg.current = MsgType(context?.msg ?? "Thành công", false)
      setIsCheck((prev) => !prev)
      resetFuc()
    }
  })

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
            <Images src={avatar ?? ""} w={48} h={48} isRounded />

            {!!isOnline && (
              <div>
                <div className="absolute -bottom-[3px] -right-[3px] bg-white rounded-full overflow-hidden p-[3px]">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
              </div>
            )}
          </div>
          <div className="pl-3 text-left w-[calc(100%_-_48px)] gap-1">
            <p className="font-semibold whitespace-nowrap truncate">{fullName}</p>
            <div className="flex items-center gap-2 [&>*]:w-1/2">
              {!is_friends && (
                <Button
                  size="sm"
                  bgColor={`${isCheck ? "danger" : "primary"}`}
                  className="!font-bold"
                  hiddenLoading
                  isPending={isDisabled}
                  onClick={() => {
                    id && mutate(id)
                  }}
                  StartIcon={isCheck ? "" : FaUserPlus}
                  sỉzeStartIcon={16}
                >
                  {isCheck ? "Hủy lời mời" : "Kết bạn"}
                </Button>
              )}

              <Button
                hiddenLoading
                StartIcon={AiTwotoneMessage}
                isPending={isDisabled}
                sỉzeStartIcon={16}
                onClick={() => onClickMesseage && onClickMesseage()}
                bgColor="success"
                size="sm"
              >
                Nhắn tin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToastCustom>
  )
}

export default FriendSearchItem
