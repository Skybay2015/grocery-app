import { useState } from "react"
import { Button, Input } from "@/components/ui"
import { useAddGrocery } from "@/api"
import { Oval } from 'react-loader-spinner'

export const AddItemForm = () => {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState(1)
  const { addGroceryItem, isPending } = useAddGrocery()



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await addGroceryItem({ title, amount })
    setTitle("")
    setAmount(1)
  }

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleSetAmount = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Add item..."
        value={title}
        onChange={handleSetTitle}
        disabled={isPending}
      />
      <Input
        type="number"
        value={amount}
        onChange={handleSetAmount}
        className="w-20"
        disabled={isPending}
      />


      <Button type="submit" className="justify-items-center">
        {isPending ?
          <Oval
            color="white"
            secondaryColor="white"
            ariaLabel="oval-loading"
            wrapperClass="flex-1 w-[26px] justify-center" /> : "Add"}
      </Button>
    </form>
  )
}
