import { FC, useEffect, useState } from "react"
import { BsTelephoneFill, BsThreeDotsVertical } from "react-icons/bs"
import { MdVideocam } from "react-icons/md"

import { createPopupWin, dateCheck } from "@/common/functions"
import { useChatProvider } from "@/layout/LayoutChatProvider"
import Images from "../Images"
import Shimmer from "../Shimmer"
import DropDown from "../DropDown"
import ModalBlockRoom from "@/partials/ModalBlockRoom"
import ModalReceive from "@/partials/ModalReceive"
import { useSocket } from "@/layout/SocketContextLayout"
import { useProtectedLayout } from "@/layout/ProtectedLayout"
import config from "@/config"
import { callerRoom } from "@/api/roomsApi"

interface BoxRoomHeaderProps {
  data?: userData
  isFetched?: boolean
}

const BoxRoomHeader: FC<BoxRoomHeaderProps> = ({ data, isFetched }) => {
  const { socket } = useSocket()
  const { room } = useChatProvider()
  const { user } = useProtectedLayout()
  const [isOpen, setIsOpen] = useState(false)
  const [isReceive, setIsReceive] = useState(false)

  useEffect(() => {
    if (socket) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.on("caller-pending", (data: callerRoom) => {
        if (user?.id === data?.receiver_id) {
          !isReceive && setIsReceive(true)
        }
      })

      socket.on("rejected-caller", () => {
        setIsReceive(false)
      })

      return () => {
        socket.off("caller-pending")
        socket.off("rejected-caller")
      }
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, user])

  return (
    <div className="flex justify-between items-center p-2 pt-0">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <button type="button" className="xl:hidden hover:text-primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative flex-none">
          {!isFetched && (
            <div className="rounded-full w-10 h-10 sm:h-12 sm:w-12 relative overflow-hidden">
              <Shimmer />
            </div>
          )}

          {isFetched && (
            <Images src={data?.avatar ?? ""} className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover" />
          )}

          {isFetched && !!data?.is_online && (
            <div>
              <div className="absolute -bottom-[3px] -right-[3px] bg-white rounded-full overflow-hidden p-[3px]">
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        <div className="mx-3">
          {!isFetched && (
            <div className="relative overflow-hidden h-[24px] mb-[2px]">
              Nguyễn Đình Chuân
              <Shimmer />
            </div>
          )}

          {isFetched && <p className="font-semibold mb-[2px]">{data?.full_name}</p>}

          {!isFetched && (
            <div className="relative overflow-hidden h-[16px] text-white-dark text-xs">
              Đang hoạt động
              <Shimmer />
            </div>
          )}

          {isFetched && (
            <p className="text-white-dark text-xs">
              {data?.is_online !== 0 ? "Đang hoạt động" : `Hoạt động ${dateCheck(data?.last_logger ?? "")} trước`}
            </p>
          )}
        </div>
      </div>

      <div className="flex sm:gap-5 gap-3">
        {!!(room?.settings?.is_block === 0) && (
          <>
            <button type="button">
              <BsTelephoneFill size={19} className="hover:text-primary" />
            </button>

            <button
              type="button"
              onClick={async () => {
                createPopupWin(
                  `${config.router.callVideo}?room_id=${room?.room_id}`,
                  "Gọi video",
                  screen.width - 50,
                  screen.height - 50
                )

                await callerRoom({
                  caller_id: "ssjsj",
                  room_id: room?.room_id
                })
              }}
            >
              <MdVideocam size={25} className="hover:text-primary" />
            </button>
          </>
        )}

        <DropDown
          childrenButton={
            <BsThreeDotsVertical
              size={26}
              className="hover:bg-[#dcdee5] p-1 rounded-full transition-all duration-150 cursor-pointer"
            />
          }
        >
          <div className="bg-white shadow-sm p-1 min-w-[150px]">
            <div
              aria-hidden="true"
              onClick={() => setIsOpen(true)}
              className="cursor-pointer p-2 flex items-center space-x-2 hover:bg-[#555] hover:text-white relative"
            >
              <span className="text-sm font-semibold">{room?.settings?.is_block === 0 ? "Chặn" : "Bỏ chặn"}</span>
            </div>
          </div>
        </DropDown>

        <ModalBlockRoom isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {isReceive && <ModalReceive isOpen={isReceive} setIsOpen={setIsReceive} />}
    </div>
  )
}

export default BoxRoomHeader
