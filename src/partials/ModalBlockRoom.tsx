import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { MsgType } from "@/common/functions"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import ToastCustom from "@/components/ToastCustom"
import { toggleBlockRoom } from "@/api/roomsApi"
import { useChatProvider } from "@/layout/LayoutChatProvider"

interface ModalBlockRoomProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ModalBlockRoom: FC<ModalBlockRoomProps> = ({ isOpen, setIsOpen }) => {
  const { room, refetch } = useChatProvider()
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const toastMsg = useRef<ToastConfig>({ title: "", type: "warn" })
  const isCheck = room?.settings?.is_block === 0

  const resetFuc = () => {
    setIsOpenToast(true)
    setIsOpen(false)
    setIsPending(false)
  }

  const { mutate } = useMutation({
    mutationFn: (values: number) => {
      return toggleBlockRoom(values)
    },
    onError: () => {
      toastMsg.current = MsgType("Lỗi không xác định")
      resetFuc()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      toastMsg.current = MsgType(context?.msg ?? "Xoá thành công", false)
      refetch && refetch()
      resetFuc()
    }
  })

  const handelUnFriend = () => {
    if (room?.room_id && room?.room_id !== 0) {
      setIsPending(true)
      mutate(room?.room_id)
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="px-2 py-3 border-b-[1px]">
          <h2 className="text-xl text-center font-semibold">{isCheck ? "Chặn" : "Bỏ chặn"} tin nhắn và cuộc gọi?</h2>
        </div>

        <div className="py-2 !pb-5 px-3">
          <p>
            {isCheck
              ? "Nếu bạn không ẩn đi thì cuộc trò chuyện vẫn sẽ hiển thị trong phần Đoạn chat."
              : `Tài khoản của bạn sẽ bắt đầu nhận được tin nhắn hoặc cuộc gọi từ tài khoản của ${room?.friend?.first_name}.`}
          </p>

          <div className="flex items-end gap-3 mt-5 justify-end select-none">
            <Button
              bgColor="danger"
              isOutline
              onClick={() => {
                !isPending && setIsOpen(false)
              }}
            >
              Hủy
            </Button>
            <Button isPending={isPending} onClick={handelUnFriend}>
              {isCheck ? "Chặn" : "Bỏ chặn"}
            </Button>
          </div>
        </div>
      </Modal>
    </ToastCustom>
  )
}

export default ModalBlockRoom
