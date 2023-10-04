import { FC } from "react"

import images from "@/assets/img"

interface BoxMesseageProps {
  src?: string
  messeage?: string | null
  isActive?: boolean
  date?: string
}

const BoxMesseage: FC<BoxMesseageProps> = ({ src, messeage, isActive, date }) => {
  return (
    <div className={`flex items-start gap-3 ${isActive ? "justify-end" : "justify-start"}`}>
      {!isActive && (
        <div className={`flex-none`}>
          <img src={src ?? images.defaultAvatar} className="rounded-full h-10 w-10 object-cover" alt="" />
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className={`p-4 py-2 rounded-md ${isActive ? "!bg-primary text-white" : "bg-black/10"}`}>{messeage}</div>
        </div>
        <div className={`text-xs text-white-dark text-left`}>{date}</div>
      </div>
    </div>
  )
}

export default BoxMesseage
