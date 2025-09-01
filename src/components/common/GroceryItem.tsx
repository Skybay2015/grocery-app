import { useDeleteGrocery, useUpdateGrocery } from "@/api"
import { Checkbox, Button, Input } from "@/components/ui"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useState } from "react"
import { Oval } from 'react-loader-spinner'

type GroceryItemProps = {
  item: GroceryItem
}

export const GroceryItem = ({ item }: GroceryItemProps) => {
  const { id, title, bought, amount } = item
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editAmount, setEditAmount] = useState(amount)


  const { updateGroceryItem, isPending: isUpdatePending } = useUpdateGrocery()
  const { deleteGroceryItem, isPending: isDeletePending } = useDeleteGrocery()

  const isPending = isDeletePending || isUpdatePending

  const handleSave = async () => {
    setIsEditing(false)
    if (editAmount !== amount || editTitle !== title) {
      await updateGroceryItem({ id, title: editTitle, amount: editAmount, bought })
    }
  }

  const handleDeleteItem = () => deleteGroceryItem(id)

  const handleChecboxChange = (checked: CheckedState) => updateGroceryItem({ ...item, bought: Boolean(checked) })

  return (
    <div className="flex items-center justify-between p-2 border rounded-lg shadow-sm relative">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={bought}
          disabled={isPending}
          onCheckedChange={handleChecboxChange}
        />

        {isEditing ? (
          <div className="flex content-center gap-2">
            <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            <Input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(Number(e.target.value))}
              className="w-20"
            />
          </div>
        ) : (
          <span className={`text-lg ${isPending || bought ? "text-gray-500" : ""} ${bought ? "line-through" : ""}`}>
            {title} — {amount}
          </span>
        )}

      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <Button disabled={isPending} onClick={handleSave} size="sm">
            Save
          </Button>
        ) : (
          <Button disabled={isPending} onClick={() => setIsEditing(true)} size="sm"> {
            isUpdatePending ?
              <Oval
                color="white"
                secondaryColor="white"
                ariaLabel="oval-loading"
                wrapperClass="flex-1 w-[24px] justify-center" />
              :
              "Edit"
          }</Button>
        )}
        <Button disabled={isPending} onClick={handleDeleteItem} variant="destructive" className="text-grey-700" size="sm">
          {isDeletePending ?
            <Oval
              color="white"
              secondaryColor="white"
              ariaLabel="oval-loading"
              wrapperClass="flex-1 w-[37px] justify-center" />
            :
            "Delete"
          }
        </Button>
      </div>
    </div>
  )
}
