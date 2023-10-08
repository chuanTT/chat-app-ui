import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { MsgType } from "@/common/functions"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { tableFriends, unFriend } from "@/api/userApi"
import ToastCustom from "@/components/ToastCustom"

interface ModalUnFriendProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  activeUser?: userData
}

const ModalUnFriend: FC<ModalUnFriendProps> = ({ isOpen, setIsOpen, activeUser }) => {
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
      return unFriend(values)
    },
    onError: () => {
      toastMsg.current = MsgType("Lỗi không xác định")
      resetFuc()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      toastMsg.current = MsgType(context?.msg ?? "Xoá thành công", false)
      queryClient.invalidateQueries([tableFriends])
      resetFuc()
    }
  })

  const handelUnFriend = () => {
    if (activeUser?.id) {
      setIsPending(true)
      mutate(activeUser.id)
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
          <h2 className="text-xl text-center font-semibold">Hủy kết bạn với {activeUser?.full_name}</h2>
        </div>

        <div className="py-2 !pb-5 px-3">
          <p>
            Bạn có chắc chắn muốn hủy kết bạn với <span className="font-medium">{activeUser?.full_name}</span> không?
          </p>

          <div className="flex items-end gap-3 mt-5 justify-end select-none">
            <Button
              bgColor="danger"
              isOutline
              onClick={(e: Event) => {
                e.preventDefault()
                isPending && setIsOpen(false)
              }}
            >
              Hủy
            </Button>
            <Button isPending={isPending} onClick={handelUnFriend}>
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </ToastCustom>
  )
}

export default ModalUnFriend
