import { searchUser, tableSearch } from "@/api/userApi"
import useFetchingApi from "@/hooks/useFetchingApi"
import { FC, memo, useEffect, useState } from "react"
import { LoadingIcon } from "./Icons"
import FriendSearchItem from "./FriendSearchItem"
import { useSearchParams } from "react-router-dom"

interface LoadResultSearchProps extends ListRoomLeftProps {
  search?: string
}

const LoadResultSearch: FC<LoadResultSearchProps> = ({ search, setActiveFriend, setUserActive }) => {
  const [, setSearchParams] = useSearchParams()
  const [dataSearch, setDataSearch] = useState<seacrhUserData[]>([])
  const {
    data: result,
    refetch,
    isFetched
  } = useFetchingApi({
    nameTable: tableSearch,
    CallAPi: searchUser,
    isConfig: false,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 1
    },
    customUrl: ({ query, nameTable }) => {
      let url = query?.for(nameTable)
      url = url.params({
        q: search
      })
      return url?.url()
    }
  })

  useEffect(() => {
    if (search) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if (result?.data?.data) {
      setDataSearch(result?.data?.data)
    }
  }, [result])

  return (
    <>
      {!!search && (
        <p className="whitespace-nowrap font-medium text-sm mb-3">Tìm kiếm ký tự chứa &quot;{search}&quot;</p>
      )}
      <div className="h-[calc(100vh_-_180px)] overflow-x-hidden overflow-y-auto scroll_search !mt-3">
        {!isFetched && !!search && (
          <div className="flex justify-center mb-2">
            <LoadingIcon isSpin />
          </div>
        )}

        {isFetched && (
          <div>
            {dataSearch &&
              dataSearch?.map((item: seacrhUserData, index: number) => {
                return (
                  <FriendSearchItem
                    fullName={item?.full_name ?? ""}
                    isOnline={item?.is_online}
                    avatar={item?.avatar ?? ""}
                    is_friends={item?.is_friend}
                    id={item?.id}
                    is_invite={item?.is_invite}
                    onClickMesseage={() => {
                      setUserActive(item)
                      if (item?.id) {
                        setActiveFriend(item?.id)
                        setSearchParams({
                          friend_id: item.id.toString()
                        })
                      }
                    }}
                    key={index}
                  />
                )
              })}
          </div>
        )}
      </div>
    </>
  )
}

export default memo(LoadResultSearch)
