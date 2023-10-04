import { FC, ReactNode } from "react"
import { Link, Navigate } from "react-router-dom"

import authCover from "@/assets/img/illustrations/auth-cover.svg"
import config from "@/config"

interface LayoutAuthProps {
  children?: ReactNode
  textOr?: string
  textButton?: string
  pathButton?: string
}

const LayoutAuth: FC<LayoutAuthProps> = ({ children, textOr, textButton, pathButton }) => {
  const token = localStorage.getItem("token")

  if (token) {
    return <Navigate to={config.router.home} />
  }

  return (
    <div className="flex min-h-screen">
      <div className="bg-gradient-to-t from-[#ff1361bf] to-[#44107A] w-1/2  min-h-screen hidden lg:flex flex-col items-center justify-center text-white dark:text-black p-4">
        <div className="w-full mx-auto mb-5">
          <img src={authCover} alt="coming_soon" className="lg:max-w-[370px] xl:max-w-[500px] mx-auto" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-center">Join the community of expert developers</h3>
        <p>It is easy to setup with great customer experience. Start your 7-day free trial</p>
      </div>
      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        <div className="max-w-[550px] p-4">
          {children}
          <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2]  dark:before:bg-[#253b5c]">
            <div className="font-bold text-white-dark bg-[#fafafa] dark:bg-[#060818] px-2 relative z-[1] inline-block">
              <span>Hoặc</span>
            </div>
          </div>
          <p className="text-center">
            {textOr}
            <Link to={pathButton ?? ""} className="font-bold text-primary hover:underline ml-1">
              {textButton}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LayoutAuth
