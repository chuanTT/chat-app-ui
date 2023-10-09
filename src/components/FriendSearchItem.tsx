import { FC } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"

import Images from "./Images"
import DropDown from "./DropDown"

const FriendSearchItem: FC<FriendItemProps> = ({ avatar, isOnline, fullName, onClickMesseage, onClickUnFriend }) => {
  return (
    <button type="button" className={`w-full flex justify-between items-center p-2 rounded-md`}>
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
        <div className="pl-3 text-left w-[calc(100%_-_48px)] flex justify-between items-center gap-1">
          <p className="font-semibold whitespace-nowrap truncate">{fullName}</p>

          <DropDown
            childrenButton={
              <BsThreeDotsVertical
                size={26}
                className="hover:bg-[#dcdee5] p-1 rounded-full transition-all duration-150"
              />
            }
          >
            <div className="bg-white shadow-sm p-1">
              <div
                onClick={onClickMesseage}
                aria-hidden="true"
                className="cursor-pointer p-2 flex items-center space-x-2 hover:bg-[#555] hover:text-white relative"
              >
                <span className="text-sm font-semibold">Nhắn tin</span>
              </div>

              <div
                onClick={onClickUnFriend}
                aria-hidden="true"
                className="cursor-pointer p-2 flex items-center space-x-2 hover:bg-[#555] hover:text-white relative"
              >
                <span className="text-sm font-semibold">Hủy kết bạn</span>
              </div>
            </div>
          </DropDown>
        </div>
      </div>
    </button>
  )
}

export default FriendSearchItem
