import { useEffect, useState } from "react"

import { getInvite, tableInvite } from "@/api/inviteApi"
import InviteItem from "@/components/InviteItem"
import useFetchingApi from "@/hooks/useFetchingApi"
import { LoadingIcon } from "@/components/Icons"

const InvitePage = () => {
  const [ListInvite, setListInvite] = useState<InviteResult[]>([])
  const {
    data: resultInvite,
    remove,
    isFetched
  } = useFetchingApi({
    nameTable: tableInvite,
    CallAPi: getInvite
  })

  useEffect(() => {
    if (resultInvite?.data?.data) {
      setListInvite(resultInvite?.data?.data)
    }
  }, [resultInvite])

  return (
    <div>
      {ListInvite &&
        ListInvite?.map((invite: InviteResult, index: number) => {
          return <InviteItem render={invite} key={index} removeFuc={remove} />
        })}

      {!isFetched && (
        <div className="flex justify-center">
          <LoadingIcon isSpin />
        </div>
      )}
    </div>
  )
}

export default InvitePage
