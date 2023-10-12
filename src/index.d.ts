import { ReactNode, SetStateAction } from "react"
declare global {
  interface SelectDefault {
    value?: string | number
    label?: string | number
  }

  interface typeObject {
    [key: string]: string | number | boolean
  }

  interface typeObjectAdv {
    [key: string]: string | number | Blob | FileList
  }

  type configTabPage = "mailbox" | "friend" | "invite"

  interface ListRoomLeftProps {
    setActiveFriend: Dispatch<SetStateAction<number>>
    activeFriend?: number
  }

  interface LoadingProps {
    isCenterScreen?: boolean
    classNameDiv?: string
    isIndex?: boolean
  }

  interface ToastCustomProps {
    children?: ReactNode
    title?: string
    isOpenToast?: boolean
    type?: "success" | "error" | "warn"
    timeEnd?: number
    CloseEvent?: () => void
  }

  interface ToastConfig {
    title: string
    type: ToastCustomProps["type"]
  }

  interface ImagesUploadFieldProps {
    classWapper?: string
    defaultSrc?: string
    classParentImg?: string
    register?: UseFormRegister<FieldValues>
    name: string
    validType?: string[]
    msgSize?: string
    sizeFile?: number
    msgType?: string
    setValue?: UseFormSetValue<FieldValues>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldError?: any
  }

  type ImagesUploadCustomType = Omit<ImagesUploadFieldProps, "setFieldError" | "setValue"> & {
    children?: ReactNode
    onChangeFile?: (src?: string) => void
  }

  interface refListImage {
    clearImage?: () => void
    setImage?: (str: string) => void
  }

  type refImageCus = refListImage & {
    getSrc: () => string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFile: () => any
  }

  type chatForm = {
    messeage?: string
    room_id?: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    media?: any
  }

  interface customUrlProps {
    nameTable?: string
    page?: number
    limit?: number
    query?: QueryRequest
    RestProps?: typeObject
    searchValue?: typeObject
    [key: string]: string | number | undefined | QueryRequest | typeObject | object | boolean
  }

  interface useFetchingApiParmeter {
    nameTable: string
    page?: number
    limit?: number
    customUrl?: (props: customUrlProps) => void | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CallAPi?: (url: string) => Promise<any>
    update?: boolean
    configCus?: UseQueryOptions
    isConfig?: boolean
    retry?: number
    RestProps?: typeObject
    searchValue?: typeObject
  }

  interface userData {
    id?: number
    username?: string
    first_name?: string | null
    last_name?: string | null
    full_name?: string | null
    birthday?: string | null
    avatar?: string | null
    gender?: number
    is_online?: number
    is_lock?: number
    is_block_stranger?: number
    is_busy?: number
    last_logger?: string | null
    password?: string
    token?: string
    created_at?: string
    updated_at?: string
  }

  interface roomSetting {
    friend?: userData
    settings?: {
      is_block: number
    }
  }

  interface dataProvider {
    user?: userData
    token?: string
    setUser?: Dispatch<SetStateAction<userData>>
    saveAuth?: () => void
    removeAuth?: () => void
  }

  interface roomResult {
    room_id?: number
    friend?: {
      id: number
      full_name: string
      first_name: string
      last_name: string
      username: string
      avatar: string
      is_online: number
    }
    messeage?: {
      id: number
      owner_id: number
      messeage: string
      is_media: number
      updated_at: string
    }
  }

  interface ChatItemProps {
    room_id?: number
    avatar?: string
    first_name?: string
    isOnline?: number
    fullName?: string
    messeage?: string
    isMedia?: number
    isMatched?: boolean
    update_at?: string
    isActice?: boolean
    hiddenMesseage?: boolean
    handelClick?: () => void
  }

  type FriendItemProps = Omit<
    ChatItemProps,
    "handelClick" | "first_name" | "messeage" | "isMedia" | "isMatched" | "isActice" | "hiddenMesseage"
  > & {
    onClickMesseage?: () => void
    onClickUnFriend?: () => void
  }

  type FriendSearchProps = FriendItemProps & {
    is_friends?: boolean
    is_invite?: boolean
    id?: number
  }

  interface RoomDetails {
    id: number
    is_edit: number
    list_media: []
    user: {
      id: number
      full_name: string | null
      first_name: string | null
      last_name: string
      username: string
      avatar: string
    }
    messeage: string | null
    room_id: number
    created_at: string
    updated_at: string
  }

  interface RoomCheck {
    room_id?: number
    friend?: userData
    settings?: { is_block?: number }
  }

  interface InviteResult {
    created_at: string
    friend_id: number
    user: userData
  }

  type seacrhUserData = userData & {
    is_friend?: boolean
    is_invite?: boolean
  }
}

export {}
