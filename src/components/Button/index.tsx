import { NavLink, NavLinkProps } from "react-router-dom"
import { FC, ComponentType, HTMLAttributes, ReactNode } from "react"
import { LoadingIcon } from "../Icons"

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  tag?:
    | keyof JSX.IntrinsicElements
    | ComponentType
    | React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>
  to?: string
  href?: string
  wIcon?: number
  hIcon?: number
  isPending?: boolean
  isOutline?: boolean
  size?: "lg" | "sm"
  isReset?: boolean
  sỉzeStartIcon?: number
  classStartIcon?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  StartIcon?: (props?: any) => JSX.Element
  bgColor?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "white" | "transparent"

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void
}

const Button: FC<ButtonProps> = ({
  tag,
  to,
  href,
  className,
  onClick,
  id,
  children,
  isPending,
  isOutline,
  bgColor = "primary",
  isReset,
  size,
  sỉzeStartIcon = 20,
  classStartIcon,
  StartIcon,
  ...rest
}) => {
  let Comp = tag ?? "button"
  const btnColor = bgColor === "transparent" ? "" : `btn-${isOutline ? "outline-" : ""}${bgColor}`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any = {
    ...rest,
    onClick
  }

  if (to) {
    Comp = NavLink
    props = { ...props, to }
  } else if (href) {
    Comp = "a"
    props = { ...props, href }
  }

  if (id) {
    props = { ...props, id }
  }

  return (
    <Comp
      className={`${isPending ? "opacity-50 cursor-default" : "cursor-pointer"} ${className ?? ""} btn ${
        isReset ? "!shadow-none !outline-none !border-none" : `${size ? `btn-${size}` : ""} ${btnColor}`
      } `}
      disabled={isPending}
      {...props}
    >
      {isPending && (
        <span className={`block ${children ? "mr-2" : ""} mr-2`}>
          <LoadingIcon isSpin={isPending} />
        </span>
      )}
      {StartIcon && !isPending && <StartIcon size={sỉzeStartIcon} className={`mr-1 ${classStartIcon}`} />}
      {children}
    </Comp>
  )
}

export default Button
