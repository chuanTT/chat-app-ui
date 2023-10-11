import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { ImSearch } from "react-icons/im"
import { MdOutlineClose } from "react-icons/md"
import { useDebouncedValue } from "rooks"
import { HiOutlineArrowLeft } from "react-icons/hi"
import LoadResultSearch from "./LoadResultSearch"

interface SearchComponentProps extends ListRoomLeftProps {
  isFocus: boolean
  setIsFocus: Dispatch<SetStateAction<boolean>>
}

const SearchComponent: FC<SearchComponentProps> = ({ setIsFocus, isFocus, setActiveFriend }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useDebouncedValue(value, 1000)
  const refSearch = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLDivElement>(null)

  const resetValue = () => {
    setValue("")
    setDebouncedValue("")
  }

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!inputRef.current) return
      const elem = document.querySelector(".scroll_search")
      if (
        !isFocus ||
        inputRef.current?.contains(target as HTMLElement) ||
        closeRef.current?.contains(target as HTMLElement) ||
        elem?.contains(target as HTMLElement)
      ) {
        return
      }
      setIsFocus(false)
      inputRef.current?.blur()
      resetValue()
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus])

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 flex items-center gap-2">
          {isFocus && (
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
              onClick={() => {
                resetValue()
                setIsFocus(false)
              }}
              aria-hidden="true"
            >
              <HiOutlineArrowLeft size={20} />
            </div>
          )}

          <div className="relative flex-1" ref={refSearch}>
            <input
              ref={inputRef}
              type="text"
              className="form-input bg-gray-100 outline-none select-none pl-8 py-2 pr-10 text-sm rounded-2xl w-full"
              placeholder="Tìm kiếm trên chat"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocus(true)}
            />
            <ImSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />

            <div
              ref={closeRef}
              onClick={() => {
                resetValue()
                inputRef.current?.focus()
                setIsFocus(true)
              }}
              aria-hidden="true"
              className={`${
                value ? "opacity-100 visible" : "invisible opacity-0"
              } absolute hover:bg-[#dfe2e9] transition-all duration-200 cursor-pointer select-none top-1/2 -translate-y-1/2 right-1 bg-[#e4e6eb] rounded-full w-8 h-8 flex items-center justify-center`}
            >
              <MdOutlineClose size={20} />
            </div>
          </div>
        </div>
      </div>

      {isFocus && <LoadResultSearch search={debouncedValue} setActiveFriend={setActiveFriend} />}
    </>
  )
}

export default SearchComponent
