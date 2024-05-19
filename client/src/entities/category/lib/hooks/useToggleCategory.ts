import {IInsertCategory, useToggleCategoryMutation} from "@entities/category";

export const useToggleCategory = () => {
    const [childTrigger, {data}] = useToggleCategoryMutation()


    const trigger = async (value: IInsertCategory) => {
        await childTrigger(value)
    }

    return {trigger, data}
}