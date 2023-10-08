import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

import config from "@/config"
import { BASE_URL } from "@/api/axiosClient"

const socketContext = createContext({})

interface SocketContextLayoutProps {
  children?: ReactNode
}

interface SocketValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket?: any
}

const SocketContextLayout: FC<SocketContextLayoutProps> = ({ children }) => {
  const [token] = useState(localStorage.getItem(config.localKey.token))
  // please note that the types are reversed
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (token) {
      const newSocket = io(BASE_URL, {
        auth: {
          token
        }
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
      }
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const value: SocketValue = {
    socket
  }

  return <socketContext.Provider value={value}>{children}</socketContext.Provider>
}

export const useSocket = (): SocketValue => {
  const socket = useContext(socketContext)
  return socket
}

export default SocketContextLayout
