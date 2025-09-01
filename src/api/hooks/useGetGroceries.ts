import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/api/axios"
import { QUERY_KEYS } from "../keys"
import { GroceryItem } from "@/types"

export const useGetGroceries = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.GET_GROCERIES],
    queryFn: async () => {
      const res = await api.get<GroceryItem[]>("/groceries")
      return res.data.reverse()
    },
  })

  return {
    groceryItems: data,
    isError,
    isLoading
  }
}





