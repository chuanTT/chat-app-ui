/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { options } from "@/common/optionStatic"
import Button from "@/components/Button"
import { DatePickerField, InputField, ReactSelectCus } from "@/components/CustomField"
import Modal from "@/components/Modal"
import ImagesUploadField from "@/components/CustomField/ImagesUploadField"

import { useForm } from "react-hook-form"
import useFetchingApi from "@/hooks/useFetchingApi"
import { getMe, tableUser, updateUser } from "@/api/userApi"
import { RefTypeDate } from "@/components/CustomField/DatePicker"
import { useMutation } from "@tanstack/react-query"
import moment from "moment"
import { MsgType, isEmptyObj } from "@/common/functions"
import ToastCustom from "@/components/ToastCustom"
import SendFormData from "@/components/FormHandel/SendFormData"

interface ModalUpdateUserProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const defaultValue = {
  first_name: "",
  last_name: "",
  birthday: "",
  gender: 0,
  is_block_stranger: 0
}

const ModalUpdateUser: FC<ModalUpdateUserProps> = ({ isOpen, setIsOpen }) => {
  const { handleSubmit, register, setValue, getValues, reset } = useForm()
  const [isUpdate, setIsUpdate] = useState(false)
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const toastMsg = useRef<ToastConfig>({ title: "", type: "warn" })
  const dateRef = useRef<RefTypeDate>(null)

  const { data, refetch } = useFetchingApi({
    nameTable: tableUser,
    CallAPi: getMe,
    isConfig: false,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 1,
      keepPreviousData: true
    },
    customUrl: ({ query, nameTable }) => {
      return query?.for(nameTable)?.url()
    }
  })

  const resetFuc = () => {
    setIsOpenToast(true)
    setIsOpen(false)
    setIsPending(false)
  }

  const { mutate } = useMutation({
    mutationFn: (data?: any) => {
      return updateUser(data)
    },
    onError() {
      toastMsg.current = MsgType("Lỗi không xác định")
      resetFuc()
    },

    onSuccess(context: any) {
      toastMsg.current = MsgType(context?.msg ?? "Xoá thành công", false)
      refetch()
      resetFuc()
    }
  })

  useEffect(() => {
    refetch()
  }, [isUpdate])

  useEffect(() => {
    if (data?.data) {
      const arrKey = Object.keys(defaultValue)
      if (arrKey) {
        const result = data?.data
        arrKey?.forEach((key) => {
          let value = result[key]
          if (key === "is_block_stranger") {
            value = value ? 1 : 0
          } else if (key === "birthday") {
            value && dateRef?.current?.setValue?.(value)
            return
          }

          setValue(key, value)
        })
      }
    }
  }, [data, isReset])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (value: any) => {
    const {avatar, ...rest} = value
    let data = {
      ...rest,
      is_block_stranger: value?.is_block_stranger ? 1 : "0",
      gender: value?.gender === 1 ? 1 : '0',
      birthday: moment(value?.birthday).format("YYYY-MM-DD")
    }

    if (!isEmptyObj(avatar)) {
      data = { ...data, avatar }
      data = SendFormData(data)
    }

    mutate(data)
  }

  const resetForm = () => {
    setIsOpen(false)
    reset()
    dateRef?.current?.clearValue?.()
    setIsReset((prev) => !prev)
  }

  return (
    <ToastCustom
      CloseEvent={() => {
        setIsOpenToast(false)
      }}
      isOpenToast={isOpenToast}
      title={toastMsg.current.title}
      type={toastMsg.current.type}
    >
      <Modal isOpen={isOpen} setIsOpen={() => resetForm()} classModalWidth="max-h-[95%] overflow-y-auto">
        <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
          <ImagesUploadField name="avatar" setValue={setValue} defaultSrc="" />

          <div className="mt-4 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <InputField
                name="last_name"
                placeholder="Nhập họ và tên"
                title="Họ & đệm"
                isRequire
                register={register}
              />
              <InputField name="first_name" placeholder="Nhập tên" title="Tên" isRequire register={register} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <DatePickerField
                rest={{
                  portalId: "react-date"
                }}
                ref={dateRef}
                name="birthday"
                placeholder="Chọn ngày sinh"
                title="Ngày sinh"
                setValue={setValue}
              />
              <ReactSelectCus
                options={options}
                name="gender"
                placeholder="Chọn giới tính"
                title="Giới tính"
                setValue={setValue}
                getValue={getValues}
              />
            </div>

            <div className="flex items-center space-x-3">
              <label htmlFor="custom_switch_checkbox1" className="!mb-0 select-none cursor-pointer">
                Chặn người lạ
              </label>

              <label className="w-12 h-6 relative !mb-0">
                <input
                  type="checkbox"
                  className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                  id="custom_switch_checkbox1"
                  {...register("is_block_stranger")}
                />
                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
              </label>
            </div>

            <div className="flex items-center gap-5 justify-center">
              <Button>Lưu lại</Button>
              <Button
                bgColor="danger"
                onClick={(e: Event) => {
                  e.preventDefault()
                  resetForm()
                }}
              >
                Đóng
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </ToastCustom>
  )
}

export default ModalUpdateUser
