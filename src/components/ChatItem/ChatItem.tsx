import { FC } from "react"

import { dateCheck } from "@/common/functions"
import Images from "../Images"
import DropDown from "../DropDown"
import { BsThreeDotsVertical } from "react-icons/bs"

const ChatItem: FC<ChatItemProps> = ({
  avatar,
  isOnline,
  fullName,
  messeage,
  isMedia,
  isMatched,
  first_name,
  update_at,
  isActice,
  hiddenMesseage = false,
  handelClick,
  onDeleteRoom
}) => {
  return (
    <button
      type="button"
      className={`w-full group  flex justify-between items-center relative p-2 hover:bg-gray-100 dark:hover:bg-[#050b14] rounded-md  hover:text-primary ${
        isActice ? "text-primary bg-gray-100" : ""
      }`}
      onClick={() => handelClick && handelClick()}
    >
      <div className="flex items-center w-full">
        <div className="flex-shrink-0 relative">
          <Images src={avatar ?? ""} w={48} h={48} isRounded />

          {!!isOnline && (
            <div>
              <div className="absolute -bottom-[3px] -right-[3px] bg-white rounded-full overflow-hidden p-[3px]">
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        <div className="pl-3 text-left w-[calc(100%_-_48px)] truncate">
          <p className="mb-1 font-semibold whitespace-nowrap truncate">{fullName}</p>
          {!hiddenMesseage && (
            <p className="text-xs text-white-dark flex w-full">
              <span className="whitespace-nowrap text-ellipsis overflow-x-hidden">
                {isMedia === 1 ? "Có hình ảnh mới" : `${isMatched ? "Bạn: " : `${first_name}: `} ${messeage}`}
              </span>
              <span className="px-1 block"> · </span>
              <span className="inline-block">{dateCheck(update_at)}</span>
            </p>
          )}
        </div>
      </div>

      <DropDown
        classButton="absolute right-2 invisible opacity-0 group-hover:opacity-100 group-hover:visible shadow-md border border-[#dcdee554] bg-white rounded-full hover:bg-[#dcdee533] p-1 transition-all duration-150  text-gray-500"
        childrenButton={<BsThreeDotsVertical size={20} className="rotate-90" />}
      >
        <div className="bg-white shadow-sm p-1">
          <div
            aria-hidden="true"
            onClick={() => onDeleteRoom && onDeleteRoom()}
            className="cursor-pointer p-2 flex items-center space-x-2 hover:bg-[#555] hover:text-white relative"
          >
            <span className="text-sm font-semibold">Xóa đoạn chat</span>
          </div>
        </div>
      </DropDown>
    </button>
  )
}

export default ChatItem
