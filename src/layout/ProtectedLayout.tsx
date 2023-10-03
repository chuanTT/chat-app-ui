import { Navigate, useNavigate } from "react-router-dom"
import config from "@/config"
import { FC, createContext, useContext, useMemo, useState, ReactNode } from "react"
import { LogoutApi } from "@/api/authApi"

const protectedLayoutContext = createContext({})

interface ProtectedLayoutProps {
  children?: ReactNode
  userData?: userData
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children, userData }) => {
  const [user, setUser] = useState(userData ?? {})
  const navigate = useNavigate()

  const removeAuth = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await LogoutApi()
    if (data?.code === 200) {
      setUser({})
      localStorage.setItem(config.localKey.token, "")
      navigate("/login", { replace: true })
    }
  }

  const value = useMemo(
    () => ({
      setUser,
      user,
      removeAuth
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  if (!user?.id) {
    return <Navigate to={config.router.login}/>
  }

  return <protectedLayoutContext.Provider value={value}>{children}</protectedLayoutContext.Provider>
}

export const useProtectedLayout = () => {
  const data: dataProvider = useContext(protectedLayoutContext)

  return data
}

export default ProtectedLayout
