import { FC } from "react"
import images from "@/assets/img"
import { dateCheck } from "@/common/functions"

const ChatItem: FC<ChatItemProps> = ({
  avatar,
  isOnline,
  fullName,
  messeage,
  isMedia,
  isMatched,
  first_name,
  update_at,
  handelClick
}) => {
  return (
    <button
      type="button"
      className={`w-full flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-[#050b14] rounded-md dark:hover:text-primary hover:text-primary `}
      onClick={() => handelClick && handelClick()}
    >
      <div className="flex items-center w-full">
        <div className="flex-shrink-0 relative">
          <img src={avatar ?? images.defaultAvatar} className="rounded-full h-12 w-12 object-cover" alt="avatar" />
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
          <p className="text-xs text-white-dark flex w-full">
            <span className="whitespace-nowrap text-ellipsis overflow-x-hidden">
              {isMedia === 1 ? "Có hình ảnh mới" : `${isMatched ? "Bạn: " : `${first_name}: `} ${messeage}`}
            </span>
            <span className="px-1 block"> · </span>
            <span className="inline-block">{dateCheck(update_at)}</span>
          </p>
        </div>
      </div>
    </button>
  )
}

export default ChatItem
