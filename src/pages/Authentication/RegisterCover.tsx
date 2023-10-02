import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

import Button from "@/components/Button"
import { InputField, InputPassword, ReactSelectCus } from "@/components/CustomField"
import config from "@/config"
import LayoutAuth from "@/layout/LayoutAuth"
import { options } from "@/common/optionStatic"
import FormHandel from "@/components/FormHandel"
import { ResgiterApi } from "@/api/authApi"

const schema = Yup.object().shape({
  last_name: Yup.string().required("Vui lòng nhập họ và đệm"),
  first_name: Yup.string().required("Vui lòng nhập tên"),
  username: Yup.string().required("Vui lòng tài khoản"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 ký tự"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
})

const RegisterCover = () => {
  const navigate = useNavigate()

  return (
    <LayoutAuth textOr="Bạn đã có tài khoản ?" textButton="Đăng nhập" pathButton={config.router.login}>
      <h2 className="font-bold text-3xl mb-3">Đăng ký</h2>
      <p className="mb-7">Vui lòng đăng ký tài khoản của bạn để đăng nhập</p>
      <FormHandel
        isValidate
        schema={schema}
        sussFuc={(result) => {
          if (result?.data?.token) {
            localStorage.setItem("token", result?.data?.token)
            navigate(config.router.home)
          }
        }}
        errorFuc={(reset) => {
          reset &&
            reset({
              password: "",
              confirm_password: ""
            })
        }}
        removeClassForm
        ClassForm="space-y-5"
        callApi={ResgiterApi}
      >
        {({ propForm, isPending }) => {
          const {
            register,
            setValue,
            getValues,
            clearErrors,
            formState: { errors }
          } = propForm

          return (
            <>
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  name="last_name"
                  placeholder="Nhập họ và đệm"
                  title="Họ & đệm"
                  isRequire
                  register={register}
                  errors={errors}
                />
                <InputField
                  name="first_name"
                  placeholder="Nhập tên"
                  title="Tên"
                  isRequire
                  register={register}
                  errors={errors}
                />
              </div>
              <InputField
                name="username"
                placeholder="Nhập tài khoản"
                title="Tài khoản"
                isRequire
                register={register}
                errors={errors}
              />
              <ReactSelectCus
                name="gender"
                options={options}
                placeholder="Chọn giới tính"
                title="Giới tính"
                isRequire
                setValue={setValue}
                getValue={getValues}
                clearErrors={clearErrors}
                errors={errors}
              />
              <InputPassword
                name="password"
                placeholder="Nhập mật khẩu"
                title="Mật khẩu"
                isRequire
                register={register}
                errors={errors}
              />
              <InputPassword
                name="confirm_password"
                placeholder="Nhập xác nhập mật khẩu"
                title="Xác nhập mật khẩu"
                isRequire
                register={register}
                errors={errors}
              />
              <Button className="w-full" isPending={isPending}>
                Đăng ký
              </Button>
            </>
          )
        }}
      </FormHandel>
    </LayoutAuth>
  )
}

export default RegisterCover
