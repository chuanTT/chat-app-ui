import QueryRequest from "@/api/builder/QueryRequest"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

const useFetchingApi = ({
  nameTable = "",
  page = 1,
  limit = 10,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  customUrl = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  CallAPi = () => new Promise((resolve) => resolve),
  update = false,
  configCus = {},
  isConfig = true,
  retry = 1,
  ...RestProps
}: useFetchingApiParmeter) => {
  const queryClient = useQueryClient()
  const query = new QueryRequest()
  const url =
    customUrl({ query, nameTable, page, limit, ...RestProps }) || query.for(nameTable).page(page).limit(limit).url()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = isConfig ? { keepPreviousData: true, retry } : configCus

  const { isPreviousData, data, ...rest } = useQuery([nameTable, url], () => CallAPi(url), config)

  const prefetchQueryClient = () => {
    queryClient.prefetchQuery([nameTable, url], () => CallAPi(url))
  }

  const invalidateQueriesQueryClient = () => {
    queryClient.invalidateQueries([nameTable, url])
  }

  const removeData = () => {
    rest?.remove()
  }

  useEffect(() => {
    if (!isPreviousData && data?.data?.pagination?.last_page > page) {
      queryClient.prefetchQuery([nameTable, url], () => CallAPi(url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, update])

  return {
    isPreviousData,
    data,
    prefetchQueryClient,
    invalidateQueriesQueryClient,
    removeData,
    ...rest
  }
}

export default useFetchingApi
