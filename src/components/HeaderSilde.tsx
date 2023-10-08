import { useProtectedLayout } from "@/layout/ProtectedLayout"
import Images from "./Images"

const HeaderSide = () => {
  const { user } = useProtectedLayout()
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex-none">
          <Images src={user?.avatar ?? ""} w={48} h={48} isRounded />
        </div>
        <div className="mx-3">
          <p className="mb-1 font-semibold">{user?.full_name}</p>
          <p className="text-xs text-white-dark">Thành viên</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderSide
