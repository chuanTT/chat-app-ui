import { searchUser, tableSearch } from "@/api/userApi"
import useFetchingApi from "@/hooks/useFetchingApi"
import { FC, memo, useEffect } from "react"
import { LoadingIcon } from "./Icons"
import FriendSearchItem from "./FriendSearchItem"

interface LoadResultSearchProps {
  search?: string
}

const LoadResultSearch: FC<LoadResultSearchProps> = ({ search }) => {
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

  return (
    <div className="!mt-0 h-[calc(100vh_-_216px)] overflow-x-hidden overflow-y-auto">
      {search && <p className="whitespace-nowrap font-medium text-sm mt-3">Tìm kiếm ký tự chứa &quot;{search}&quot;</p>}

      <div className="mt-5">
        {result?.data?.data &&
          result?.data?.data?.map((item: userData, index: number) => {
            return (
              <FriendSearchItem
                fullName={item?.full_name ?? ""}
                isOnline={item?.is_online}
                avatar={item?.avatar ?? ""}
                key={index}
              />
            )
          })}
      </div>

      {!isFetched && !!search && (
        <div className="flex justify-center mt-5">
          <LoadingIcon isSpin />
        </div>
      )}
    </div>
  )
}

export default memo(LoadResultSearch)
