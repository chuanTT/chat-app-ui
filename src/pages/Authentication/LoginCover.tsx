import { useNavigate } from "react-router-dom"

import Button from "@/components/Button"
import { InputField, InputPassword } from "@/components/CustomField"
import config from "@/config"
import LayoutAuth from "@/layout/LayoutAuth"
import FormHandel from "@/components/FormHandel"
import { LoginApi } from "@/api/authApi"

const LoginCover = () => {
  const navigate = useNavigate()

  return (
    <LayoutAuth textOr="Bạn chưa có tài khoản ?" textButton="Đăng ký" pathButton={config.router.register}>
      <h2 className="font-bold text-3xl mb-3">Đăng nhập</h2>
      <p className="mb-7">Vui lòng nhập tài khoản hoặc mật khẩu của bạn để đăng nhập</p>
      <FormHandel
        removeClassForm
        ClassForm="space-y-5"
        callApi={LoginApi}
        sussFuc={(result) => {
          if (result?.data?.token) {
            localStorage.setItem("token", result?.data?.token)
            navigate(config.router.home)
          }
        }}
        errorFuc={(reset) => {
          reset &&
            reset({
              password: ""
            })
        }}
      >
        {({ propForm, isPending }) => {
          const {
            register,
            formState: { errors }
          } = propForm
          return (
            <>
              <InputField
                name="username"
                placeholder="Nhập tài khoản"
                title="Tài khoản"
                register={register}
                errors={errors}
              />
              <InputPassword
                name="password"
                placeholder="Nhập mật khẩu"
                title="Mật khẩu"
                register={register}
                errors={errors}
              />
              <Button className="w-full" isPending={isPending}>
                Đăng nhập
              </Button>
            </>
          )
        }}
      </FormHandel>
    </LayoutAuth>
  )
}

export default LoginCover
