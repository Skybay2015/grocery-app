import { useQueryClient, useMutation } from '@tanstack/react-query'
import { api } from '@/api/axios'
import { QUERY_KEYS } from '../keys'
import { toast } from 'react-toastify'
import { NewGroceryItem } from '@/types'

export const useAddGrocery = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newItem: NewGroceryItem) => {
      await api.post("/groceries", { ...newItem, bought: false })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_GROCERIES] }),
    onError: () => toast('Error Adding Grocery', {
      position: 'top-center',
      type: 'error'
    })
  })

  return { addGroceryItem: mutateAsync, isPending }
}

