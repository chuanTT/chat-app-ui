import { useNavigate } from "react-router-dom"

import Button from "@/components/Button"
import { InputField, InputPassword, ReactSelectCus } from "@/components/CustomField"
import config from "@/config"
import LayoutAuth from "@/layout/LayoutAuth"
import { options } from "@/common/optionStatic"

const RegisterCover = () => {
  const navigate = useNavigate()

  const submitForm = () => {
    navigate("/")
  }

  return (
    <LayoutAuth textOr="Bạn đã có tài khoản ?" textButton="Đăng nhập" pathButton={config.router.login}>
      <h2 className="font-bold text-3xl mb-3">Đăng ký</h2>
      <p className="mb-7">Vui lòng đăng ký tài khoản của bạn để đăng nhập</p>
      <form className="space-y-5" onSubmit={submitForm}>
        <InputField name="username" placeholder="Nhập tài khoản" title="Tài khoản" isRequire />
        <ReactSelectCus name="gender" options={options} placeholder="Chọn giới tính" title="Giới tính" isRequire />
        <InputPassword name="password" placeholder="Nhập mật khẩu" title="Mật khẩu" isRequire />
        <InputPassword
          name="confirm_password"
          placeholder="Nhập xác nhập mật khẩu"
          title="Xác nhập mật khẩu"
          isRequire
        />
        <Button className="w-full">Đăng ký</Button>
      </form>
    </LayoutAuth>
  )
}

export default RegisterCover
