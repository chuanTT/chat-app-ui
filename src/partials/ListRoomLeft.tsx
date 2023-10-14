import { FC, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import useFetchingApi from "@/hooks/useFetchingApi"
import { ChatItem } from "@/components/ChatItem"
import { getRoom, tableRoom } from "@/api/roomsApi"
import { useProtectedLayout } from "@/layout/ProtectedLayout"
import { LoadingIcon } from "@/components/Icons"
import ModalDeleteRoom from "./ModalDeleteRoom"



const ListRoomLeft: FC<ListRoomLeftProps> = ({ setActiveFriend, activeFriend }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [dataID, setDataID] = useState<DataControlType>({
    roomID: 0,
    friendID: 0
  })
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
      const newRoomList = resultRoom?.data?.data as roomResult[]
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
              onDeleteRoom={() => {
                if (item?.room_id && item?.friend?.id) {
                  setDataID({
                    roomID: item?.room_id,
                    friendID: item?.friend?.id
                  })
                }
                setIsOpen(true)
              }}
              handelClick={() => {
                const friend_id = item?.friend?.id
                friend_id && setActiveFriend(friend_id)
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

      <ModalDeleteRoom isOpen={isOpen} setIsOpen={setIsOpen} dataID={dataID} setActiveFriend={setActiveFriend} />
    </div>
  )
}

export default ListRoomLeft
