import { FC } from "react"

import images from "@/assets/img"

interface BoxMesseageProps {
  src?: string
  messeage?: string | null
  listMedia?: {
    id?: number
    id_messeage?: number
    media?: string
    created_at?: string
    updated_at?: string
  }[]
  isActive?: boolean
  date?: string
  isContinuous?: boolean
}

const BoxMesseage: FC<BoxMesseageProps> = ({ src, messeage, isActive, date, isContinuous, listMedia }) => {
  return (
    <div className={`flex items-start gap-3 ${isActive ? "justify-end" : "justify-start"}`}>
      {!isActive && !isContinuous && (
        <div className={`flex-none`}>
          <img src={src ?? images.defaultAvatar} className="rounded-full h-10 w-10 object-cover" alt="" />
        </div>
      )}

      <div className={`space-y-2 w-[60%] break-all ${!isActive && isContinuous ? "ml-[52px]" : ""}`}>
        {messeage && (
          <div className={`flex items-center ${isActive ? "justify-end" : "justify-start"}`}>
            <div className={`p-4 py-2 rounded-md ${isActive ? "!bg-primary text-white" : "bg-black/10"}`}>
              {messeage}
            </div>
          </div>
        )}

        {listMedia && listMedia?.length > 0 && (
          <div className={`flex items-center ${isActive ? "justify-end" : "justify-start"}`}>
            {listMedia?.map((item) => {
              return <img key={item?.id} style={{ maxHeight: 200 }} src={item?.media} alt={messeage ?? "chat"} />
            })}
          </div>
        )}

        <div className={`text-xs text-white-dark ${isActive ? "text-right" : "text-left"}`}>{date}</div>
      </div>
    </div>
  )
}

export default BoxMesseage
