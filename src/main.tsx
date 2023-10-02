import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"

import "react-toastify/ReactToastify.min.css"

import router from "./router"
import "./index.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      cacheTime: 30000
    }
  }
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
      {/* <ReactQueryDevtools position="bottom-right" initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
)
