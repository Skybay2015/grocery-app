import { useQueryClient, useMutation } from '@tanstack/react-query'
import { api } from '@/api/axios'
import { QUERY_KEYS } from '../keys'
import { toast } from 'react-toastify'

export const useDeleteGrocery = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/groceries/${id}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_GROCERIES] }),
    onError: () => toast('Error Deleting Grocery', {
      position: 'top-center',
      type: 'error'
    })
  })


  return {
    deleteGroceryItem: mutate,
    isPending
  }
}
