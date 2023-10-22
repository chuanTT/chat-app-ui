import { useEffect, useState, FC } from "react"
import { useSearchParams } from "react-router-dom"

import { getFriends, tableFriends } from "@/api/userApi"
import useFetchingApi from "@/hooks/useFetchingApi"
import FriendItem from "@/components/FriendItem"
import ModalUnFriend from "./ModalUnFriend"
import { LoadingIcon } from "@/components/Icons"

const ListFriendsLeft: FC<ListRoomLeftProps> = ({ setActiveFriend }) => {
  const [, setSearchParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [userActive, setUserActive] = useState<userData>({})
  const [ListFriends, setListFriends] = useState<userData[]>([])
  const { data: resultFriends, isFetched } = useFetchingApi({
    nameTable: tableFriends,
    CallAPi: getFriends
  })

  useEffect(() => {
    if (resultFriends?.data?.data) {
      const newRoomList = resultFriends?.data?.data as userData[]
      setListFriends(newRoomList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultFriends])

  return (
    <div>
      {ListFriends &&
        ListFriends?.map((item: userData, index: number) => {
          return (
            <FriendItem
              onClickUnFriend={() => {
                setUserActive(item)
                setIsOpen(true)
              }}
              onClickMesseage={() => {
                if (item?.id) {
                  setActiveFriend(item?.id)
                  setSearchParams({
                    friend_id: item.id.toString()
                  })
                }
              }}
              isOnline={item?.is_online}
              avatar={item?.avatar ?? ""}
              fullName={item?.full_name ?? ""}
              key={index}
            />
          )
        })}

      {!isFetched && (
        <div className="flex justify-center">
          <LoadingIcon isSpin />
        </div>
      )}

      {isOpen && <ModalUnFriend isOpen={isOpen} setIsOpen={setIsOpen} activeUser={userActive} />}
    </div>
  )
}

export default ListFriendsLeft
