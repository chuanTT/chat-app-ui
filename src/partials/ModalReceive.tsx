import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { FaVideo } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

import Modal from "@/components/Modal"
import ToastCustom from "@/components/ToastCustom"
import { useChatProvider } from "@/layout/LayoutChatProvider"
import { rejectedCaller } from "@/api/roomsApi"
import { createPopupWin } from "@/common/functions"
import config from "@/config"
import { useSocket } from "@/layout/SocketContextLayout"

interface ModalReceiveProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsCaller?: Dispatch<SetStateAction<boolean>>
  dataCallerPending?: callerRoom
  audioReceive?: HTMLAudioElement
}

const ModalReceive: FC<ModalReceiveProps> = ({ isOpen, setIsOpen, dataCallerPending, audioReceive }) => {
  const { socket } = useSocket()
  const [isOpenToast, setIsOpenToast] = useState(false)
  const { room } = useChatProvider()
  const toastMsg = useRef<ToastConfig>({ title: "", type: "warn" })

  return (
    <ToastCustom
      CloseEvent={() => {
        setIsOpenToast(false)
      }}
      isOpenToast={isOpenToast}
      title={toastMsg.current.title}
      type={toastMsg.current.type}
    >
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} classModalWidth="max-h-[95%] overflow-y-auto !max-w-[20rem]">
        <div className="p-3">
          <img
            src={room?.friend?.avatar ?? "https://api.chuandinh.click/avatar/default/male_3.png"}
            alt="img"
            className="w-[60px] h-[60px] rounded-full object-cover mx-auto"
          />

          <p className="text-2xl text-center font-bold mt-4">{room?.friend?.full_name} đang gọi cho bạn</p>
          <span className="text-center mt-2 block">Cuộc gọi bắt đầu khi bạn chấp nhận</span>

          <div className="flex items-center justify-center mt-4 gap-6">
            <div className="flex items-center flex-col">
              <div
                aria-hidden="true"
                onClick={async () => {
                  if (room?.room_id) {
                    await rejectedCaller(room?.room_id)
                  }
                  setIsOpen(false)
                }}
                className="w-[40px] h-[40px] flex items-center cursor-pointer justify-center text-white bg-[#ff443d] rounded-full"
              >
                <IoMdClose size={22} />
              </div>
              <span className="block mt-1">Từ chối</span>
            </div>

            <div className="flex items-center flex-col">
              <div
                aria-hidden="true"
                onClick={() => {
                  setIsOpen(false)
                  audioReceive && audioReceive.pause()
                  if (socket) {
                    socket.emit("caller-must", dataCallerPending)
                  }
                  createPopupWin(
                    `${config.router.callVideo}?room_id=${room?.room_id}&caller_id=${dataCallerPending?.caller_id}`,
                    "Gọi video",
                    screen.width - 50,
                    screen.height - 50
                  )
                }}
                className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center text-white bg-[#31cc46] rounded-full"
              >
                <FaVideo size={22} />
              </div>
              <span className="block mt-1">Chấp nhận</span>
            </div>
          </div>
        </div>
      </Modal>
    </ToastCustom>
  )
}

export default ModalReceive
