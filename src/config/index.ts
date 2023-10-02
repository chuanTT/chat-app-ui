import router from "./router"

const config = {
  router,
  localKey: {
    token: "token"
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  formDataFile: (thumb: any[], formData: FormData, key?: string) => {
    if (thumb) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arrFile: any[] = Array.from(thumb)

      if (arrFile && formData && arrFile?.length > 0) {
        for (const file of arrFile) {
          formData.append(key ?? "thumb", file)
        }
      }
    }
  }
}

export default config
