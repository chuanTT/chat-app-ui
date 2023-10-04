import { ImSearch } from "react-icons/im"

import images from "@/assets/img"
import { ChatItem } from "@/components/ChatItem"

import { useProtectedLayout } from "@/layout/ProtectedLayout"
import useFetchingApi from "@/hooks/useFetchingApi"
import { getRoom, tableRoom } from "@/api/roomsApi"
import BoxRoom from "@/components/BoxRoom"
import { useState } from "react"

const Home = () => {
  const { user } = useProtectedLayout()
  const [activeRoom, setActiveRoom] = useState(0)
  const { data: resultRoom } = useFetchingApi({
    nameTable: tableRoom,
    CallAPi: getRoom,
    customUrl: ({ query, nameTable, limit, page }) => {
      return query?.for(nameTable).limit(limit)?.page(page)?.url()
    }
  })

  return (
    <div className={`flex gap-5 relative h-screen sm:min-h-0`}>
      <div
        className={`panel p-4 flex-none max-w-xs w-full absolute xl:relative z-10 space-y-4 xl:h-full hidden xl:block overflow-hidden`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-none">
              <img src={user?.avatar || images.defaultAvatar} className="rounded-full h-12 w-12 object-cover" alt="" />
            </div>
            <div className="mx-3">
              <p className="mb-1 font-semibold">{user?.full_name}</p>
              <p className="text-xs text-white-dark">member</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            className="form-input bg-gray-100 outline-none pl-8 py-2 text-sm pr-4 rounded-2xl w-full"
            placeholder="Tìm kiếm trên chat"
          />
          <ImSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
        </div>
        <div className="h-px w-full"></div>
        <div className="!mt-0 h-[calc(100vh_-_150px)] overflow-x-hidden overflow-y-auto">
          <div>
            {resultRoom?.data &&
              resultRoom?.data?.data?.map((item: roomResult, index: number) => {
                return (
                  <ChatItem
                    handelClick={() => {
                      item?.room_id && setActiveRoom(item.room_id)
                    }}
                    isOnline={item?.friend?.is_online}
                    isMedia={item?.messeage?.is_media}
                    avatar={item?.friend?.avatar}
                    fullName={item?.friend?.full_name}
                    messeage={item?.messeage?.messeage}
                    first_name={item?.friend?.first_name}
                    update_at={item?.messeage?.updated_at}
                    isMatched={user?.id === item?.messeage?.owner_id}
                    key={index}
                  />
                )
              })}
          </div>
        </div>
      </div>
      <div className="panel p-0 flex-1">
        <BoxRoom room_id={activeRoom} />
      </div>
    </div>
  )
}

export default Home
