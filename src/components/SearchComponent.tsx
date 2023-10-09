import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { ImSearch } from "react-icons/im"
import { MdOutlineClose } from "react-icons/md"
import { useDebouncedValue } from "rooks"
import LoadResultSearch from "./LoadResultSearch"

interface SearchComponentProps {
  isFocus: boolean
  setIsFocus: Dispatch<SetStateAction<boolean>>
}

const SearchComponent: FC<SearchComponentProps> = ({ setIsFocus, isFocus }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useDebouncedValue(value, 1000)

  const resetValue = () => {
    setValue("")
    setDebouncedValue("")
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            className="form-input bg-gray-100 outline-none pl-8 py-2 pr-10 text-sm rounded-2xl w-full"
            placeholder="Tìm kiếm trên chat"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false)
              resetValue()
            }}
          />
          <ImSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />

          {value && (
            <div
              onClick={() => {
                setIsFocus(true)
                resetValue()
                inputRef.current?.focus()
              }}
              aria-hidden="true"
              className="absolute hover:bg-[#dfe2e9] transition-all duration-200 cursor-pointer select-none top-1/2 -translate-y-1/2 right-1 bg-[#e4e6eb] rounded-full w-8 h-8 flex items-center justify-center"
            >
              <MdOutlineClose size={20} />
            </div>
          )}
        </div>
      </div>

      {isFocus && <LoadResultSearch search={debouncedValue} />}
    </>
  )
}

export default SearchComponent
