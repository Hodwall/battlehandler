import { create } from "zustand";


export interface ICondition {
    index: number,
    level: number,
    label: string,
}

interface ICombatant {
    index: number,
    initiative: number,
    conditions: ICondition[],
    hp: number,
}

interface ICombatStore {
    combatants: ICombatant[],
    addCombatant: (combatant: any) => void,
    removeCombatant: (index: number) => void,
    removeAllCombatants: () => void,
    updateCombatantInitiative: (index: number, initiative: number) => void,
    sortCombatants: () => void,
    addCondition: (index: number, label: string) => void,
    removeCondition: (index: number, condition_index: number) => void,
    updateConditionLevel: (index: number, condition_index: number, level: number) => void,
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
            hp: combatant.hp
        }].sort((a, b) => a.initiative - b.initiative)
    })),
    removeCombatant: (index) => set((state) => ({ combatants: [...(state.combatants.filter((c: ICombatant) => c.index != index))] })),
    removeAllCombatants: () => set(() => ({ combatants: [] })),
    updateCombatantInitiative: (index, initiative) => set((state) => {
        const array_index = state.combatants.findIndex((c) => c.index === index);
        if (array_index !== -1) {
            const combatants_ = [...state.combatants];
            combatants_[array_index].initiative = initiative;
            return { ...state, combatants: [...combatants_] };
        } else {
            return state;
        }
    }),
    sortCombatants: () => set((state) => ({ combatants: [...(state.combatants.sort((a, b) => a.initiative - b.initiative))] })),

    addCondition: (index, label) => set((state) => {
        const array_index = state.combatants.findIndex((c) => c.index === index);
        if (array_index !== -1) {
            const combatants_ = [...state.combatants];
            combatants_[array_index].conditions.push({
                index: Date.now(),
                level: 1,
                label: label,
            });
            return { ...state, combatants: [...combatants_] };
        } else {
            console.log('[Error](useCombatantStore): Could not find combatant with index ' + index);
            return state;
        }
    }),
    removeCondition: (index, condition_index) => set((state) => {
        const array_index = state.combatants.findIndex((c) => c.index === index);
        if (array_index !== -1) {
            const combatants_ = [...state.combatants];
            combatants_[array_index].conditions = combatants_[array_index].conditions.filter((c) => c.index != condition_index);
            console.log(condition_index);
            console.log(combatants_);
            return { ...state, combatants: [...combatants_] };
        } else {
            console.log('[Error](useCombatantStore): Could not find combatant with index ' + index);
            return state;
        }
    }),
    updateConditionLevel: (index, condition_index, level) => set((state) => {
        const array_index = state.combatants.findIndex((c) => c.index === index);
        if (array_index !== -1) {
            const combatants_ = [...state.combatants];
            const array_condition_index = combatants_[array_index].conditions.findIndex((c) => c.index === condition_index);
            if (condition_index !== -1) {
                combatants_[array_index].conditions[array_condition_index].level = level;
                return { ...state, combatants: [...combatants_] };
            } else {
                console.log('[Error](useCombatantStore): Could not find condition with index ' + condition_index);
                return state;
            }
        } else {
            console.log('[Error](useCombatantStore): Could not find combatant with index ' + index);
            return state;
        }
    })
}));

export default useCombatantStore;