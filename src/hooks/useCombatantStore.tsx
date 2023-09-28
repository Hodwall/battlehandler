import { create } from "zustand";

interface ICombatant {
    index?: number,
    initiative: number,
    conditions?: string[] | [],
    hp?: number,
}

interface ICombatStore {
    combatants: ICombatant[],
    addCombatant: (combatant: ICombatant) => void,
    removeCombatant: (index: number) => void,
    updateCombatantInitiative: (index: number, initiative: number) => void,
    sortCombatants: () => void,
}

const useCombatantStore = create<ICombatStore>((set) => ({
    combatants: [],
    addCombatant: (combatant) => set((state) => ({
        combatants: [...state.combatants, {
            index: (() => {
                if (state.combatants.length) {
                    for (let i = 1; i < state.combatants.length + 1; i++) {
                        if (state.combatants.findIndex((c) => c.index === i) === -1) {
                            return i;
                        }
                    }
                    return state.combatants.length + 1;
                } else {
                    return 1;
                }
            })(),
            initiative: combatant.initiative,
            conditions: [],
            hp: 0
        }].sort((a, b) => a.initiative - b.initiative)
    })),
    removeCombatant: (index) => set((state) => ({ combatants: [...(state.combatants.filter((c: ICombatant) => c.index != index))] })),
    updateCombatantInitiative: (index, initiative) => set((state) => {
        const array_index = state.combatants.findIndex((c) => c.index === index);
        if (array_index !== -1) {
            const combatants_ = [...state.combatants];
            combatants_[array_index].initiative = initiative;
            return { ...state, combatants: [...combatants_] };
        } else {
            console.log('[Error](useCombatantStore): Could not find combatant with index ' + index);
            return state;
        }
    }),
    sortCombatants: () => set((state) => ({ combatants: [...(state.combatants.sort((a, b) => a.initiative - b.initiative))] }))
}));

export default useCombatantStore;