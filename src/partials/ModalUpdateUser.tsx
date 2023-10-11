import { Dispatch, FC, SetStateAction } from "react"
import { options } from "@/common/optionStatic"
import Button from "@/components/Button"
import { DatePickerField, InputField, ReactSelectCus } from "@/components/CustomField"
import Modal from "@/components/Modal"
import ImagesUploadField from "@/components/CustomField/ImagesUploadField"

import { useForm } from "react-hook-form"

interface ModalUpdateUserProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ModalUpdateUser: FC<ModalUpdateUserProps> = ({ isOpen, setIsOpen }) => {
  const { handleSubmit, register, setValue, getValues } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (value: any) => {
    console.log(value)
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classModalWidth="max-h-[95%] overflow-y-auto">
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <ImagesUploadField name="avatar" setValue={setValue} />

        <div className="mt-4 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <InputField name="first_name" placeholder="Nhập họ và tên" title="Họ & đệm" isRequire register={register} />
            <InputField name="last_name" placeholder="Nhập tên" title="Tên" isRequire register={register} />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <DatePickerField
              rest={{
                portalId: "react-date"
              }}
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
              />
              <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
            </label>
          </div>

          <div className="flex items-center gap-5 justify-center">
            <Button>Lưu lại</Button>
            <Button bgColor="danger" onClick={() => setIsOpen(false)}>
              Đóng
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default ModalUpdateUser
