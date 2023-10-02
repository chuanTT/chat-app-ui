/* eslint-disable react/display-name */
import { createBrowserRouter, defer, IndexRouteObject, Navigate, NonIndexRouteObject, Outlet } from "react-router-dom"
import { ComponentType, LazyExoticComponent, Suspense } from "react"
import config from "@/config"

import Home from "@/pages/home"
import LoginCover from "@/pages/Authentication/LoginCover"
import RegisterCover from "@/pages/Authentication/RegisterCover"
import { verifyToken } from "@/api/authApi"
import AuthLayout from "@/layout/LayoutProvider"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const Loadable = (Comp: LazyExoticComponent<ComponentType<any>>) => () => {
  return (
    <Suspense>
      <Comp />
    </Suspense>
  )
}

export enum typeRouter {
  public = "public",
  private = "private"
}

type CustomRouteObjectParams = {
  type?: typeRouter
  title?: string
  isHeader?: boolean
  icon?: () => JSX.Element
  isNoRender?: boolean
  key?: string | string[]
  role?: string | string[]
  isEvent?: boolean
  keyParent?: string
  isShowAll?: boolean
}

export type CustomIndexRouteObject = IndexRouteObject & CustomRouteObjectParams

export type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
  CustomRouteObjectParams & {
    children?: (CustomIndexRouteObject | CustomNonIndexRouteObject)[]
  }

export type CustomRouteConfig = CustomIndexRouteObject | CustomNonIndexRouteObject

export const router: CustomRouteConfig[] = [
  {
    element: <Outlet />,
    errorElement: <Navigate to={config.router[404]} replace={true} />,
    children: [
      {
        path: config.router.home,
        loader: () => defer({ userPromise: verifyToken() }),
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Home />
          }
        ]
      },
      {
        path: config.router.login,
        element: <LoginCover />
      },
      {
        path: config.router.register,
        element: <RegisterCover />
      }
    ]
  }
]

export default createBrowserRouter(router)
