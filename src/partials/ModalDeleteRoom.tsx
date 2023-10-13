import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MsgType } from "@/common/functions"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import ToastCustom from "@/components/ToastCustom"
import { deleteRoom, tableRoom } from "@/api/roomsApi"

interface ModalDeleteRoomProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  roomID?: number
}

const ModalDeleteRoom: FC<ModalDeleteRoomProps> = ({ isOpen, setIsOpen, roomID }) => {
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const queryClient = useQueryClient()
  const toastMsg = useRef<ToastConfig>({ title: "", type: "warn" })

  const resetFuc = () => {
    setIsOpenToast(true)
    setIsOpen(false)
    setIsPending(false)
  }

  const { mutate } = useMutation({
    mutationFn: (values: number) => {
      return deleteRoom(values)
    },
    onError: () => {
      toastMsg.current = MsgType("Lỗi không xác định")
      resetFuc()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      toastMsg.current = MsgType(context?.msg ?? "Xoá thành công", false)
      queryClient.invalidateQueries([tableRoom])
      resetFuc()
    }
  })

  const handelUnFriend = () => {
    if (roomID && roomID !== 0) {
      setIsPending(true)
      mutate(roomID)
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
          <h2 className="text-xl text-center font-semibold">Xóa đoạn chat</h2>
        </div>

        <div className="py-2 !pb-5 px-3">
          <p>Bạn không thể hoàn tác sau khi xóa bản sao của cuộc trò chuyện này.</p>

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
              Xóa đoạn chat
            </Button>
          </div>
        </div>
      </Modal>
    </ToastCustom>
  )
}

export default ModalDeleteRoom
