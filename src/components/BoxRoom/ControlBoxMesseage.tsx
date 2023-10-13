/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { BsEmojiLaughingFill } from "react-icons/bs"
import { IoImages, IoSend } from "react-icons/io5"
import { IoMdClose } from "react-icons/io"

import { useSocket } from "@/layout/SocketContextLayout"
import { useChatProvider } from "@/layout/LayoutChatProvider"
import { chatRoom } from "@/api/roomsApi"
import ImagesUploadCustom from "../CustomField/ImagesUpdoadCustom"
import { isEmptyObj } from "@/common/functions"
import SendFormData from "../FormHandel/SendFormData"
import * as _ from "lodash"

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
  const inputUpload = useRef<refImageCus>(null)
  const [src, setSrc] = useState("")

  useEffect(() => {
    if (socket) {
      socket.on("messeage", (data: RoomDetails) => {
        setResultRoom((prev) => {
          return _.unionBy([...prev, data], "id")
        })
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
    setIsPending(true)

    const file = inputUpload?.current?.getFile?.()

    const isCheckFile = file && !isEmptyObj(file)

    if (isCheckFile || valueText) {
      let data: any = {
        messeage: valueText,
        room_id: room.room_id
      }

      if (isCheckFile) {
        data = { ...data, media: file }
        data = SendFormData(data)
      }
      const result = await chatRoom(data)
      if (result?.data) {
        setResultRoom((prev) => {
          return _.unionBy([...prev, result?.data], "id")
        })
      }
      if (isCheckFile) {
        setSrc("")
        inputUpload.current?.clearImage?.()
      }
      setValueText("")
      setIsPending(false)
      inputRef.current?.focus()
      scrollBottom()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessageHandle = async (event: any) => {
    if (event.key === "Enter") {
      await sendChatRoom()
    }
  }

  return (
    <div className="p-4 absolute bottom-0 left-0 w-full bg-white">
      <div className="sm:flex w-full space-x-3 rtl:space-x-reverse items-center">
        <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block">
          <ImagesUploadCustom
            name="media"
            ref={inputUpload}
            onChangeFile={(src) => {
              src && setSrc(src)
            }}
          >
            {!src && (
              <button
                type="button"
                className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
              >
                <IoImages size={20} />
              </button>
            )}
          </ImagesUploadCustom>
        </div>
        <div className="relative flex-1">
          {src && (
            <div className="bg-[#f4f4f4] p-3 min-h-[50px] flex-1 rounded-t-2xl">
              <div className="w-[48px] h-[48px] relative">
                <img className="rounded object-cover w-[48px] h-[48px]" src={src} alt="upload" />

                <div
                  aria-hidden="true"
                  onClick={() => {
                    setSrc("")
                    inputUpload.current?.clearImage?.()
                  }}
                  className="bg-white -top-2 -right-2 shadow-sm border border-gray-300 select-none rounded-full cursor-pointer p-1 absolute"
                >
                  <IoMdClose />
                </div>
              </div>
            </div>
          )}

          <div className="relative flex-1">
            <input
              className={`form-input w-full ${
                src ? "rounded-b-2xl" : "rounded-full"
              } border-0 bg-[#f4f4f4] px-12 focus:outline-none py-2`}
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
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary select-none cursor-pointe"
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
        <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block"></div>
      </div>
    </div>
  )
}

export default ControlBoxMesseage
