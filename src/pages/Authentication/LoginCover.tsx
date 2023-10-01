import { useNavigate } from "react-router-dom"

import Button from "@/components/Button"
import { InputField, InputPassword } from "@/components/CustomField"
import config from "@/config"
import LayoutAuth from "@/layout/LayoutAuth"

const LoginCover = () => {
  const navigate = useNavigate()

  const submitForm = () => {
    navigate("/")
  }

  return (
    <LayoutAuth textOr="Bạn chưa có tài khoản ?" textButton="Đăng ký" pathButton={config.router.register}>
      <h2 className="font-bold text-3xl mb-3">Đăng nhập</h2>
      <p className="mb-7">Vui lòng nhập tài khoản hoặc mật khẩu của bạn để đăng nhập</p>
      <form className="space-y-5" onSubmit={submitForm}>
        <InputField name="username" placeholder="Nhập tài khoản" title="Tài khoản" />
        <InputPassword name="password" placeholder="Nhập mật khẩu" title="Mật khẩu" />
        <Button className="w-full">Đăng nhập</Button>
      </form>
    </LayoutAuth>
  )
}

export default LoginCover
