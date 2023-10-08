import { FC, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import useFetchingApi from "@/hooks/useFetchingApi"
import { ChatItem } from "@/components/ChatItem"
import { getRoom, tableRoom } from "@/api/roomsApi"
import { useProtectedLayout } from "@/layout/ProtectedLayout"
import { LoadingIcon } from "@/components/Icons"

const ListRoomLeft: FC<ListRoomLeftProps> = ({ setActiveFriend, setUserActive, activeFriend }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useProtectedLayout()
  const [listUser, setListUser] = useState<roomResult[]>()
  const { data: resultRoom, isFetched } = useFetchingApi({
    nameTable: tableRoom,
    CallAPi: getRoom,
    customUrl: ({ query, nameTable, limit, page }) => {
      return query?.for(nameTable).limit(limit)?.page(page)?.url()
    }
  })

  useEffect(() => {
    if (resultRoom?.data?.data) {
      const friend_id = searchParams.get("friend_id")
      const newRoomList = resultRoom?.data?.data as roomResult[]
      const currentUser = newRoomList.find((user) => user.friend?.id === Number(friend_id ?? 0))
      if (currentUser) {
        setUserActive && setUserActive(currentUser?.friend ?? {})
      } else {
        setSearchParams()
        setActiveFriend(0)
      }
      setListUser(newRoomList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultRoom])

  useEffect(() => {
    const friend_id = searchParams.get("friend_id")
    if (friend_id && Number(friend_id) !== 0) {
      setActiveFriend && setActiveFriend(Number(friend_id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-1">
      {listUser &&
        listUser?.map((item: roomResult, index: number) => {
          return (
            <ChatItem
              handelClick={() => {
                const friend_id = item?.friend?.id
                friend_id && setActiveFriend(friend_id)
                setUserActive(item?.friend ?? {})
                setSearchParams({
                  friend_id: friend_id?.toString() ?? ""
                })
              }}
              isOnline={item?.friend?.is_online}
              isMedia={item?.messeage?.is_media}
              avatar={item?.friend?.avatar}
              fullName={item?.friend?.full_name}
              messeage={item?.messeage?.messeage}
              first_name={item?.friend?.first_name}
              update_at={item?.messeage?.updated_at}
              isMatched={user?.id === item?.messeage?.owner_id}
              isActice={item?.friend?.id === activeFriend}
              key={index}
            />
          )
        })}

      {!isFetched && (
        <div className="flex justify-center">
          <LoadingIcon isSpin />
        </div>
      )}
    </div>
  )
}

export default ListRoomLeft
