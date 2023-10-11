import ListFriendsLeft from "@/partials/ListFriendsLeft"
import { FC, lazy, useState } from "react"

const ListRoomLeft = lazy(() => import("@/partials/ListRoomLeft"))
const InvitePage = lazy(() => import("@/partials/ListInviteLeft"))

interface LoadControlType {
  type: configTabPage
  title: string
}

const LoadControl: LoadControlType[] = [
  {
    type: "mailbox",
    title: "Hộp thư"
  },
  {
    type: "friend",
    title: "Bạn bè"
  },
  {
    type: "invite",
    title: "Lời mời"
  }
]

const LoadPageRoomLeft: FC<ListRoomLeftProps> = ({ activeFriend, setActiveFriend }) => {
  const [tab, setTab] = useState<configTabPage>("mailbox")

  return (
    <>
      <div className="pb-4 w-full flex items-center gap-2 [&>*]:cursor-pointer [&>*]:block [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-full font-bold">
        {LoadControl.map((control) => {
          return (
            <span
              key={control.type}
              className={`text-sm select-none ${control.type === tab ? "bg-[#ebf5ff] text-[#0061d3]" : ""}`}
              onClick={(): void => setTab(control.type)}
              aria-hidden="true"
            >
              {control.title}
            </span>
          )
        })}
      </div>
      <div className="!mt-0 h-[calc(100vh_-_216px)] overflow-x-hidden overflow-y-auto">
        {tab === "mailbox" && <ListRoomLeft activeFriend={activeFriend} setActiveFriend={setActiveFriend} />}
        {tab === "friend" && <ListFriendsLeft activeFriend={activeFriend} setActiveFriend={setActiveFriend} />}
        {tab === "invite" && <InvitePage />}
      </div>
    </>
  )
}

export default LoadPageRoomLeft
