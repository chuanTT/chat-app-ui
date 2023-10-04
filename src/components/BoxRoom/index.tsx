import { FC, memo, useEffect, useState } from "react"
import { BsEmojiLaughingFill } from "react-icons/bs"
import { IoImages } from "react-icons/io5"

import { SendIcon } from "@/components/Icons"
import BoxMesseage from "@/components/BoxMesseage"
import BoxRoomHeader from "./BoxRoomHeader"
import useFetchingApi from "@/hooks/useFetchingApi"
import { getRoom, getSettingsRoom, tableRoom, tableRoomSetting } from "@/api/roomsApi"
import { dateCheck } from "@/common/functions"
import { useProtectedLayout } from "@/layout/ProtectedLayout"
interface BoxRoomProps {
  room_id?: number
}

const BoxRoom: FC<BoxRoomProps> = ({ room_id }) => {
  const { user } = useProtectedLayout()
  const [resultRoom, setResultRoom] = useState<RoomDetails[]>([])
  const { data: dataRoomSetting, refetch } = useFetchingApi({
    nameTable: tableRoomSetting,
    isConfig: false,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 1
    },
    CallAPi: getSettingsRoom,
    customUrl: ({ query, nameTable }) => {
      return query?.for(`${nameTable}/${room_id}`)?.url()
    }
  })

  const { data: dataRoomDetail, refetch: refetchRoomDetail } = useFetchingApi({
    nameTable: tableRoom,
    CallAPi: getRoom,
    isConfig: false,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 1
    },
    customUrl: ({ query, nameTable, limit, page }) => {
      return query?.for(`${nameTable}/${room_id}`).limit(limit)?.page(page)?.url()
    }
  })

  useEffect(() => {
    if (room_id) {
      refetch()
      refetchRoomDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room_id])

  useEffect(() => {
    if (dataRoomDetail?.data?.data) {
      setResultRoom(dataRoomDetail?.data?.data)
    }
  }, [dataRoomDetail])

  return (
    <>
      <BoxRoomHeader data={dataRoomSetting?.data} room_id={room_id} />
      <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

      <div className="relative h-full sm:h-[calc(100vh_-_150px)] chat-conversation-box overflow-x-hidden overflow-y-auto">
        <div className="space-y-5 p-4 sm:pb-0 pb-[68px]">
          <div className="block m-6 mt-0">
            <h4 className="text-xs text-center border-b border-[#f4f4f4] dark:border-gray-800 relative">
              <span className="relative top-2 px-3 bg-white dark:bg-black">{"Today, 16:00"}</span>
            </h4>
          </div>
          <div className="space-y-1">
            {resultRoom &&
              resultRoom?.map((detail: RoomDetails) => {
                return (
                  <BoxMesseage
                    isActive={user?.id === detail.user.id}
                    key={detail.id}
                    messeage={detail.messeage}
                    src={detail.user.avatar}
                    date={dateCheck(detail.updated_at)}
                  />
                )
              })}
          </div>
        </div>
      </div>

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
              // value={textMessage}
              // onChange={(e: any) => setTextMessage(e.target.value)}
              // onKeyUp={sendMessageHandle}
            />
            <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 hover:text-primary">
              <BsEmojiLaughingFill size={20} />
            </button>
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary">
              <SendIcon />
            </button>
          </div>
          <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block"></div>
        </div>
      </div>
    </>
  )
}

export default memo(BoxRoom)
