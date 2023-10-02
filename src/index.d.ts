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
}

export {}
