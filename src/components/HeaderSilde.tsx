import { useProtectedLayout } from "@/layout/ProtectedLayout"
import Images from "./Images"
import DropDown from "./DropDown"
import { BsThreeDotsVertical } from "react-icons/bs"

const HeaderSide = () => {
  const { user, removeAuth } = useProtectedLayout()
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center w-[calc(100%_-_26px)] pr-1">
        <div className="flex-none">
          <Images src={user?.avatar ?? ""} w={48} h={48} isRounded />
        </div>
        <div className="w-[calc(100%_-_48px)] overflow-hidden ml-3">
          <p className="mb-1 font-semibold whitespace-nowrap text-ellipsis overflow-hidden">{user?.full_name}</p>
          <p className="text-xs text-white-dark">Thành viên</p>
        </div>
      </div>

      <DropDown
        childrenButton={
          <BsThreeDotsVertical
            size={26}
            className="hover:bg-[#dcdee5] cursor-pointer p-1 rounded-full transition-all duration-150"
          />
        }
      >
        <div className="bg-white shadow-sm p-1">
          <div
            aria-hidden="true"
            className="cursor-pointer p-2 flex items-center space-x-2 hover:bg-[#555] hover:text-white relative"
          >
            <span className="text-sm font-semibold">Thông tin cá nhân</span>
          </div>

          <div
            aria-hidden="true"
            onClick={async () => {
              if (removeAuth) {
                await removeAuth()
              }
            }}
            className="cursor-pointer p-2 flex items-center space-x-2 hover:bg-[#555] hover:text-white relative"
          >
            <span className="text-sm font-semibold">Đăng xuất</span>
          </div>
        </div>
      </DropDown>
    </div>
  )
}

export default HeaderSide
