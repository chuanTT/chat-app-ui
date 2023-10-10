import { FC, memo, useEffect, useRef, useState } from "react"

import { LoadingIcon } from "@/components/Icons"
import BoxMesseage from "@/components/BoxMesseage"
import BoxRoomHeader from "./BoxRoomHeader"
import useFetchingApi from "@/hooks/useFetchingApi"
import { getRoom, tableRoom } from "@/api/roomsApi"
import { dateCheck } from "@/common/functions"
import { useProtectedLayout } from "@/layout/ProtectedLayout"

import { useChatProvider } from "@/layout/LayoutChatProvider"
import ControlBoxMesseage from "./ControlBoxMesseage"

interface BoxRoomProps {
  userActive?: userData
}

const BoxRoom: FC<BoxRoomProps> = ({ userActive }) => {
  const { user } = useProtectedLayout()
  const { room, isFetched: isFetchedRoom } = useChatProvider()
  const oldRoom = useRef(0)
  const positon = useRef({
    isScroll: false
  })
  const scrollElement = useRef<HTMLDivElement>(null)
  const [resultRoom, setResultRoom] = useState<RoomDetails[]>([])

  const {
    data: dataRoomDetail,
    isFetched,
    refetch: refetchRoomDetail
  } = useFetchingApi({
    nameTable: tableRoom,
    CallAPi: getRoom,
    isConfig: false,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 1
    },
    customUrl: ({ query, nameTable, limit, page }) => {
      return query?.for(`${nameTable}/${room?.room_id}`).limit(limit)?.page(page)?.url()
    }
  })

  const scrollBottom = () => {
    const elem = scrollElement.current
    const { isScroll } = positon.current

    if (elem) {
      if (!isScroll || elem.scrollHeight - elem.scrollTop - elem.clientHeight <= 0) {
        setTimeout(() => {
          elem.scrollTop = elem.scrollHeight
        })
      }
    }
  }

  useEffect(() => {
    if (scrollElement.current) {
      const scrollLoading = () => {
        const elem = scrollElement.current
        if (elem) {
          positon.current.isScroll = true
        }
      }

      scrollElement?.current?.addEventListener("scroll", scrollLoading)
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollElement?.current && scrollElement?.current?.removeEventListener("scroll", scrollLoading)
      }
    }

    return
  }, [scrollElement])

  useEffect(() => {
    if (room?.room_id) {
      if (oldRoom.current !== room?.room_id) {
        oldRoom.current = room?.room_id
        setResultRoom([])
      }
      refetchRoomDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.room_id])

  useEffect(() => {
    if (dataRoomDetail?.data?.data) {
      setResultRoom(dataRoomDetail?.data?.data)
      scrollBottom()
    }
  }, [dataRoomDetail])

  return (
    <>
      <BoxRoomHeader data={(userActive?.id ? userActive : room?.friend) ?? {}} isFetched={isFetchedRoom} />
      <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

      <div
        ref={scrollElement}
        className="relative h-full sm:h-[calc(100vh_-_150px)] chat-conversation-box overflow-x-hidden overflow-y-auto"
      >
        <div className="space-y-5 p-4 sm:pb-0 pb-[68px]">
          <div className="space-y-1">
            {!isFetched && (
              <div className="flex justify-center">
                <LoadingIcon isSpin />
              </div>
            )}

            {resultRoom &&
              oldRoom?.current === room?.room_id &&
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

      <ControlBoxMesseage scrollBottom={scrollBottom} setResultRoom={setResultRoom} />
    </>
  )
}

export default memo(BoxRoom)
