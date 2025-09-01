
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { api } from '@/api/axios'
import { QUERY_KEYS } from '../keys'
import { toast } from 'react-toastify'
import { GroceryItem } from '@/types'

export const useUpdateGrocery = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (item: GroceryItem) => {
      await api.put(`/groceries/${item.id}`, item)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_GROCERIES] }),
    onError: () => toast('Error Updating Grocery', {
      position: 'top-center',
      type: 'error'
    })
  })

  return {
    updateGroceryItem: mutateAsync,
    isPending
  }
}