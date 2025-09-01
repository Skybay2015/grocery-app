
import { useDeleteGrocery, useGetGroceries, useUpdateGrocery } from "@/api"
import { GroceryItem } from "./GroceryItem"
import { Skeleton } from "../ui/skeleton"



export const GroceryList = () => {
    const { groceryItems, isLoading } = useGetGroceries()

    if (isLoading) {
        return <>
            <Skeleton className="h-[50px] w-[480px]" />
            <Skeleton className="h-[50px] w-[480px]" />
            <Skeleton className="h-[50px] w-[480px]" />
            <Skeleton className="h-[50px] w-[480px]" />
        </>
    }

    return (
        <div className="flex flex-col gap-2">
            {!!groceryItems && groceryItems.map((item) => (
                <GroceryItem
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    )
}
