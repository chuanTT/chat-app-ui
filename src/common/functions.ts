import moment from "moment"

export function convertViToEn(str: number | string, toUpperCase = false) {
  str = String(str)
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, "") // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str
}

export const isEmptyObj = (obj: typeObject) => {
  let emty = true
  if (obj) {
    emty = Object.keys(obj).length === 0 && obj.constructor === Object
  }
  return emty
}

export const MsgType = (title: string, error = true): ToastConfig => {
  return {
    title,
    type: error ? "error" : "success"
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (obj: any) => {
  let isCheck = false

  if (typeof obj === "object" && !Array.isArray(obj)) {
    isCheck = true
  }

  return isCheck
}

export const dateCheck = (date?: string) => {
  return moment(date).fromNow(true)
}

export const getCamera = (callBack: (steam: MediaStream) => void) => {
  navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
    callBack(stream)
  })
}

export const playVideo = (stream: MediaStream, elmentVideo?: HTMLVideoElement | null) => {
  if (elmentVideo) {
    elmentVideo.srcObject = stream
    elmentVideo.play()
  }
}

export const createPopupWin = (pageURL: string, pageTitle: string, popupWinWidth: number, popupWinHeight: number) => {
  const left = (screen.width - popupWinWidth) / 2
  const top = (screen.height - popupWinHeight) / 2
  const myWindow = window.open(
    pageURL,
    pageTitle,
    "resizable=yes, width=" + popupWinWidth + ", height=" + popupWinHeight + ", top=" + top + ", left=" + left
  )
  myWindow?.focus()
  return myWindow
}
