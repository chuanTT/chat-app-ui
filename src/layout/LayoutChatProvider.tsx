/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import { useSocket } from "./SocketContextLayout"
import useFetchingApi from "@/hooks/useFetchingApi"
import { checkRoom } from "@/api/roomsApi"

const chatContentext = createContext({})

interface LayoutChatProviderProps {
  friend_id: number
  children?: ReactNode
}

const LayoutChatProvider: FC<LayoutChatProviderProps> = ({ friend_id, children }) => {
  const { socket } = useSocket()
  const {
    data: dataRoom,
    refetch,
    isFetched
  } = useFetchingApi({
    nameTable: "check",
    CallAPi: checkRoom,
    isConfig: false,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 1
    },
    customUrl: ({ query, nameTable }) => {
      return query.for(`${nameTable}/${friend_id}`)?.url()
    }
  })

  useEffect(() => {
    if (friend_id) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friend_id])

  useEffect(() => {
    if (dataRoom?.data && socket) {
      socket.emit("private_room", { room: dataRoom?.data?.room_id })
      return () => {
        socket.emit("leave-room")
      }
    }
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoom])

  const values = useMemo(() => {
    return {
      room: dataRoom?.data,
      isFetched,
      refetch: refetch
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoom?.data, isFetched])

  return <chatContentext.Provider value={values}>{children}</chatContentext.Provider>
}

export const useChatProvider = (): { room?: RoomCheck; isFetched?: boolean; refetch?: any } => {
  const result = useContext(chatContentext)
  return result
}

export default LayoutChatProvider
