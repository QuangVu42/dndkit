import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DenomIconLiquid from "src/common/DenomIconLiquid"
import { useLiquidityData } from 'src/jotai/liquidity/state';
import { SortableContext } from "@dnd-kit/sortable";
import { useLiquidityFunction } from "src/jotai/liquidity/state";

export default function HomeTop() {
    // vault
    const showVault = useLiquidityData()

    // sort state 
    const { arrangeListVaults } = useLiquidityFunction()

    // handleDragEnd
    const handleDragEnd = (e: DragEndEvent) =>{
        const { active, over } = e;
        if (over && active.id !== over.id) {

            const oldIndex = showVault.listVault.findIndex((item, index) => index + 1 === active.id)
            const newIndex = showVault.listVault.findIndex((item, index) => index + 1 === over.id);
            arrangeListVaults(oldIndex, newIndex)
        }
    }

    return (
        <DndContext
            onDragEnd={
                (e) => handleDragEnd(e)
            }
        >
            <SortableContext items={showVault.listVault.map((i, index) => index + 1)}>
                {showVault.listVault.map((item, index) => (
                    <DenomIconLiquid index={index + 1} token1={item?.token1Info?.symbol ?? ''} token2={item?.token2Info?.symbol ?? ''}></DenomIconLiquid>
                ))}
            </SortableContext>
        </DndContext >
    )
}
