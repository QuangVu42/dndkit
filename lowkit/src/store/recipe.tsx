import { atom, useAtomValue, useSetAtom } from 'jotai';
import { TGroupOfRecipe } from "src/types/recipe"

// type group recipe
export type IDataContextResponse = {
    activeGroupOfRecipe?: TGroupOfRecipe;
};

// initialize group recipe
const IDataContextResponse: IDataContextResponse = {
}
const DataContextRecipe = atom(IDataContextResponse)

// get value group recipe
export const useDataContextRecipe = () => useAtomValue(DataContextRecipe);

// update group recipe
export const useDataContextRecipeFunction = () => {

    // set value group recipe
    const _setDataGroupRecipe = useSetAtom(DataContextRecipe);

    // update value
    function setGroupRecipeData(data: Partial<IDataContextResponse>) {
        _setDataGroupRecipe((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }
    return {
        setGroupRecipeData
    };

}

