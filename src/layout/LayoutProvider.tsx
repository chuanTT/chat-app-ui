import { Suspense } from "react"
import { Await, Navigate, useLoaderData, useOutlet } from "react-router-dom"
import Loading from "@/components/Loading"
import ProtectedLayout from "./ProtectedLayout"

const AuthLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userPromise } = useLoaderData() as { userPromise: any }
  const outlet = useOutlet()

  return (
    <Suspense fallback={<Loading isCenterScreen />}>
      <Await resolve={userPromise} errorElement={<Navigate to="/login" replace={true} />}>
        {(userData: { data?: userData }) => {
          return <ProtectedLayout userData={userData?.data}>{outlet}</ProtectedLayout>
        }}
      </Await>
    </Suspense>
  )
}

export default AuthLayout
