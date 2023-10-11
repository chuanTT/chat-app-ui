import { useState } from "react"

import BoxRoom from "@/components/BoxRoom"
import LayoutChatProvider from "@/layout/LayoutChatProvider"
import HeaderSide from "@/components/HeaderSilde"
import { NoResult } from "@/components/Icons"
import LoadPageRoomLeft from "@/layout/LoadPageRoomLeft"
import SearchComponent from "@/components/SearchComponent"

const Home = () => {
  const [activeFriend, setActiveFriend] = useState(0)
  const [isFocus, setIsFocus] = useState(false)

  return (
    <div className={`flex gap-5 relative h-screen sm:min-h-0`}>
      <div
        className={`panel p-4 flex-none max-w-xs w-full absolute xl:relative z-10 space-y-4 xl:h-full hidden xl:block overflow-hidden`}
      >
        <HeaderSide />

        <SearchComponent
          activeFriend={activeFriend}
          setActiveFriend={setActiveFriend}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />

        {!isFocus && <LoadPageRoomLeft activeFriend={activeFriend} setActiveFriend={setActiveFriend} />}
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
            <BoxRoom />
          </LayoutChatProvider>
        )}
      </div>
    </div>
  )
}

export default Home
