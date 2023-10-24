import { getRoomOrther } from "@/api/roomsApi"
import useFetchingApi from "@/hooks/useFetchingApi"
import { FC, ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useSocket } from "./SocketContextLayout"

const contextCallVideoProvider = createContext({})

interface LayoutCallVideoProviderProps {
  children: ReactNode
}

interface valueCallVideo {
  result?: roomExist
}

const LayoutCallVideoProvider: FC<LayoutCallVideoProviderProps> = ({ children }) => {
  const [result, setResult] = useState<roomExist>({})
  const { socket } = useSocket()
  const [searchParams] = useSearchParams()
  const room_id = searchParams.get("room_id")
  const { data: dataRoomExist } = useFetchingApi({
    nameTable: "exist",
    CallAPi: getRoomOrther,
    customUrl: ({ query, nameTable }) => {
      return query.for(`${nameTable}/${room_id}`)?.url()
    }
  })

  if (!room_id) {
    window.close()
  }

  useEffect(() => {
    if (dataRoomExist?.data) {
      setResult(dataRoomExist?.data)
    }
  }, [dataRoomExist])

  useEffect(() => {
    if (dataRoomExist?.data && socket) {
      socket.emit("private_room", { room: dataRoomExist?.data?.room_id })
      return () => {
        socket.emit("leave-room")
      }
    }
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoomExist])

  const value = useMemo(() => {
    return {
      result
    }
  }, [result])

  return <contextCallVideoProvider.Provider value={value}>{children}</contextCallVideoProvider.Provider>
}

export const useCallVideoProvider = (): valueCallVideo => {
  const result = useContext(contextCallVideoProvider)
  return result
}

export default LayoutCallVideoProvider
