/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle, useRef, useState, useEffect, ForwardRefRenderFunction } from "react"
import { FieldValues, UseFormSetValue } from "react-hook-form"
import moment from "moment"
import DatePicker, { ReactDatePickerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type reactDatePick = Omit<ReactDatePickerProps, 'onChange'>

export interface InputPriceProps {
  name: string
  classDate?: string
  setValue?: UseFormSetValue<FieldValues>
  onChange?: (date: any) => void
  isRange?: boolean
  placeholder?: string
  title?: string
  isRequire?: boolean
  rest?: reactDatePick
  isInit?: boolean
  classContainerDate?: string
}

export interface RefTypeDate {
  clearValue?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: (date: any, strFormat?: string) => void
}
const DatePickerCustom: ForwardRefRenderFunction<RefTypeDate, InputPriceProps> = (
  {
    name,
    setValue,
    onChange,
    isRange = false,
    placeholder = "dd/mm/yyyy",
    classDate = "",
    title,
    isRequire,
    isInit,
    classContainerDate,
    rest
  },
  ref
) => {
  const [startDate, setStartDate] = useState(() => {
    let date = null
    if (isInit) {
      date = new Date()
      if (setValue) {
        setValue(name, isRange ? [date, date] : date)
      }
    }
    return isRange ? [date, date] : date
  })
  const [updated, setUpdated] = useState<{ update: boolean; data: Date | Date[] | null }>({
    update: false,
    data: null
  })

  useEffect(() => {
    if (updated?.update) {
      setStartDate(updated?.data)
      setUpdated({ update: !updated?.update, data: null })
    }
  }, [updated])

  useEffect(() => {
    let date = null
    if (isInit) {
      date = new Date()
    }
    setStartDate(isRange ? [date, date] : date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRange])

  useImperativeHandle(
    ref,
    () => {
      return {
        clearValue: () => {
          let date = null
          if (isInit) {
            date = new Date()
            if (setValue) {
              setValue(name, isRange ? [date, date] : date)
            }
          }
          setStartDate(isRange ? [date, date] : date)
        },
        setValue: (date: any, strFormat?: string) => {
          const format = strFormat ?? "YYYY-MM-DD HH:mm:ss"
          let d
          if (isRange) {
            const range = []
            const [s1, s2] = date
            const strS1: moment.Moment = moment(s1, format)
            const strS2 = moment(s2, format)
            range.push(strS1.toDate())
            range.push(strS2.toDate())
            d = range
          } else {
            const _d = moment(date, format)
            d = _d.toDate()
          }
          setValue && setValue(name, d)
          setUpdated({ update: !updated?.update, data: d })
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRange]
  )

  const options = useRef<ReactDatePickerProps>({
    ...rest,
    onChange: (date: any) => {
      setStartDate(date)
      setValue && setValue(name, date)
      onChange && onChange(date)
    }
  })

  if (isRange) {
    const { selected, ...rest } = options.current
    const [s, e] = Array.isArray(startDate) ? startDate : []

    options.current = {
      ...rest,
      startDate: s,
      endDate: e
    }
  } else {
    options.current = {
      ...options.current,
      selected: Array.isArray(startDate) ? null : startDate
    }
  }

  return (
    <div className={classContainerDate ?? ""}>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={`relative ${classDate}`}>
        <DatePicker
          isClearable
          name={name}
          autoComplete="off"
          dateFormat="dd/MM/yyyy"
          selectsRange={isRange}
          {...options.current}
          // showMonthYearPicker
          placeholderText={placeholder}
          className="pl-9 bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5"
        />

        <div className=" absolute inset-0 right-auto flex items-center pointer-events-none">
          <svg className="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const DatePickerField = forwardRef(DatePickerCustom)

export default DatePickerField
