
import { AddItemForm, GroceryList } from "@/components/common"

export const Home = () => {
    return (
        <div className="max-w-lg mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Grocery List</h1>
            <AddItemForm />
            <GroceryList />
        </div>
    )
}
