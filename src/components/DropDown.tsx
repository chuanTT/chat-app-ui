import { FC, ReactNode, useRef, useEffect } from "react"
import Portal from "./Portal"

interface DropDownProps {
  children?: ReactNode
  childrenButton?: ReactNode
}

const DropDown: FC<DropDownProps> = ({ children, childrenButton }) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handelClick = () => {
    const buttonElement = buttonRef.current
    const menuElement = menuRef.current

    if (buttonElement && menuElement) {
      if (!menuElement.classList.contains("open")) {
        menuElement.style.opacity = "1"
        menuElement.style.visibility = "visible"
        const { top, left, height, width } = buttonElement.getBoundingClientRect()
        const { width: widthMenu, height: heightMenu } = menuElement.getBoundingClientRect()
        const heightWindown = window.innerHeight
        const maxHeight = top + height + heightMenu

        if (maxHeight > heightWindown) {
          menuElement.style.top = `${top - heightMenu - 2}px`
        } else {
          menuElement.style.top = `${top + height + 2}px`
        }

        menuElement.style.left = `${left - widthMenu + width}px`
        menuElement.classList.add("open")
      } else {
        menuElement.style.opacity = "0"
        menuElement.style.visibility = "hidden"
        menuElement.classList.remove("open")
      }
    }
  }

  useEffect(() => {
    const menuHandel = (e: Event) => {
      const buttonElement = buttonRef.current
      if (buttonElement?.contains(e.target as HTMLElement)) return
      const menuElement = menuRef.current
      if (menuElement) {
        menuElement.style.opacity = "0"
        menuElement.style.visibility = "hidden"
        menuElement.classList.remove("open")
      }
    }

    document.addEventListener("click", menuHandel)

    return () => {
      document.removeEventListener("click", menuHandel)
    }
  }, [])

  return (
    <>
      <div ref={buttonRef} onClick={handelClick} aria-hidden="true">
        {childrenButton}
      </div>
      <Portal>
        <div className="fixed transition-all duration-200 z-10 shadow-menu bg-white" ref={menuRef}>
          {children}
        </div>
      </Portal>
    </>
  )
}

export default DropDown
