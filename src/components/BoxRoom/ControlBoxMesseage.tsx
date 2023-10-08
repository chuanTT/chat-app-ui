import { BsEmojiLaughingFill } from "react-icons/bs"
import { IoImages } from "react-icons/io5"
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"

import { useSocket } from "@/layout/SocketContextLayout"
import { SendIcon } from "../Icons"
import { useChatProvider } from "@/layout/LayoutChatProvider"
import { chatRoom } from "@/api/roomsApi"

interface ControlBoxMesseageProps {
  setResultRoom: Dispatch<SetStateAction<RoomDetails[]>>
  scrollBottom: () => void
}

const ControlBoxMesseage: FC<ControlBoxMesseageProps> = ({ setResultRoom, scrollBottom }) => {
  const { room } = useChatProvider()
  const { socket } = useSocket()
  const [valueText, setValueText] = useState("")
  const [isPeding, setIsPending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (socket) {
      socket.on("messeage", (data: RoomDetails) => {
        setResultRoom((prev) => [...prev, data])
        scrollBottom()
      })

      return () => {
        socket && socket.off("messeage")
      }
    }
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  const sendChatRoom = async () => {
    if (isPeding) return
    if (!room?.room_id) return
    if (!valueText) return
    setIsPending(true)
    await chatRoom({
      messeage: valueText,
      room_id: room.room_id
    })
    setValueText("")
    setIsPending(false)
    inputRef.current?.focus()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessageHandle = async (event: any) => {
    if (event.key === "Enter") {
      await sendChatRoom()
    }
  }

  return (
    <div className="p-4 absolute bottom-0 left-0 w-full">
      <div className="sm:flex w-full space-x-3 rtl:space-x-reverse items-center">
        <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block">
          <button
            type="button"
            className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
          >
            <IoImages size={20} />
          </button>
        </div>
        <div className="relative flex-1">
          <input
            className="form-input w-full rounded-full border-0 bg-[#f4f4f4] px-12 focus:outline-none py-2"
            placeholder="Type a message"
            value={valueText}
            ref={inputRef}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => setValueText(e.target.value)}
            onKeyUp={sendMessageHandle}
          />
          <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 hover:text-primary">
            <BsEmojiLaughingFill size={20} />
          </button>
          <button
            type="button"
            disabled={isPeding}
            onClick={sendChatRoom}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary select-none"
          >
            <SendIcon />
          </button>
        </div>
        <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block"></div>
      </div>
    </div>
  )
}

export default ControlBoxMesseage
