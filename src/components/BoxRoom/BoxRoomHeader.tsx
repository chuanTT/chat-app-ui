import { FC } from "react"
import { BsTelephoneFill } from "react-icons/bs"
import { MdVideocam } from "react-icons/md"

import { dateCheck } from "@/common/functions"
import { useChatProvider } from "@/layout/LayoutChatProvider"
import Images from "../Images"
import Shimmer from "../Shimmer"

interface BoxRoomHeaderProps {
  data?: userData
  isFetched?: boolean
}

const BoxRoomHeader: FC<BoxRoomHeaderProps> = ({ data, isFetched }) => {
  const { room } = useChatProvider()

  return (
    <div className="flex justify-between items-center p-2 pt-0">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <button type="button" className="xl:hidden hover:text-primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative flex-none">
          {!isFetched && (
            <div className="rounded-full w-10 h-10 sm:h-12 sm:w-12 relative overflow-hidden">
              <Shimmer />
            </div>
          )}

          {isFetched && (
            <Images src={data?.avatar ?? ""} className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover" />
          )}

          {isFetched && !!data?.is_online && (
            <div>
              <div className="absolute -bottom-[3px] -right-[3px] bg-white rounded-full overflow-hidden p-[3px]">
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        <div className="mx-3">
          {!isFetched && (
            <div className="relative overflow-hidden h-[24px] mb-[2px]">
              Nguyễn Đình Chuân
              <Shimmer />
            </div>
          )}

          {isFetched && <p className="font-semibold mb-[2px]">{data?.full_name}</p>}

          {!isFetched && (
            <div className="relative overflow-hidden h-[16px] text-white-dark text-xs">
              Đang hoạt động
              <Shimmer />
            </div>
          )}

          {isFetched && (
            <p className="text-white-dark text-xs">
              {data?.is_online !== 0 ? "Đang hoạt động" : `Hoạt động ${dateCheck(data?.last_logger ?? "")} trước`}
            </p>
          )}
        </div>
      </div>

      {!!(room?.settings?.is_block === 0) && (
        <div className="flex sm:gap-5 gap-3">
          <button type="button">
            <BsTelephoneFill size={19} className="hover:text-primary" />
          </button>

          <button type="button">
            <MdVideocam size={25} className="hover:text-primary" />
          </button>
        </div>
      )}
    </div>
  )
}

export default BoxRoomHeader