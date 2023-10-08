import { useState } from "react"
import { ImSearch } from "react-icons/im"

import BoxRoom from "@/components/BoxRoom"
import LayoutChatProvider from "@/layout/LayoutChatProvider"
import HeaderSide from "@/components/HeaderSilde"
import { NoResult } from "@/components/Icons"
import LoadPageRoomLeft from "@/layout/LoadPageRoomLeft"

const Home = () => {
  const [activeFriend, setActiveFriend] = useState(0)
  const [userActive, setUserActive] = useState<userData>({})

  return (
    <div className={`flex gap-5 relative h-screen sm:min-h-0`}>
      <div
        className={`panel p-4 flex-none max-w-xs w-full absolute xl:relative z-10 space-y-4 xl:h-full hidden xl:block overflow-hidden`}
      >
        <HeaderSide />
        <div className="relative">
          <input
            type="text"
            className="form-input bg-gray-100 outline-none pl-8 py-2 text-sm pr-4 rounded-2xl w-full"
            placeholder="Tìm kiếm trên chat"
          />
          <ImSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
        </div>
        <LoadPageRoomLeft
          activeFriend={activeFriend}
          setActiveFriend={setActiveFriend}
          setUserActive={setUserActive}
          userActive={userActive}
        />
      </div>
      <div className="panel p-0 flex-1">
        {!activeFriend && (
          <div className="flex items-center justify-center h-full relative p-4">
            <div className="py-8 flex items-center justify-center flex-col">
              <div className="w-[280px] md:w-[430px] mb-8 h-[calc(100vh_-_320px)] min-h-[120px] text-white dark:text-black">
                <NoResult />
              </div>
            </div>
          </div>
        )}
        {!!activeFriend && (
          <LayoutChatProvider friend_id={activeFriend}>
            <BoxRoom userActive={userActive} />
          </LayoutChatProvider>
        )}
      </div>
    </div>
  )
}

export default Home
