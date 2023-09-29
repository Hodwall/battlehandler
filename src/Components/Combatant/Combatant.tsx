import { useState } from 'react';
import useCombatantStore, { ICondition } from '../../hooks/useCombatantStore';
import Condition from '../Condition/Condition';
import { GiSaberSlash } from 'react-icons/gi';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import './Combatant.css';


const Combatant = (props: {
    index: number,
    initiative: number,
    hp: number,
    conditions: ICondition[],
}) => {
    const [hp, setHp] = useState(props.hp);
    const [damage, setDamage] = useState(0);
    const [condition, setCondition] = useState('');
    const removeCombatant = useCombatantStore((state) => state.removeCombatant);
    const updateCombatantInitiative = useCombatantStore((state) => state.updateCombatantInitiative);
    const addCondition = useCombatantStore((state) => state.addCondition);

    const handleRemove = () => {
        removeCombatant(props.index);
    };

    const handleAttack = () => {
        setHp(hp - damage);
        setDamage(0);
    };

    const handleAddCondition = (e: any) => {
        const last_char = e.target.value[e.target.value.length - 1];
        console.log(last_char);
        if (e.key === 'Enter' || last_char === ' ') {
            if (condition !== '') {
                console.log(condition);
                addCondition(props.index, condition);
                setCondition('');
            }
        } else {
            setCondition(e.target.value);
        }
    };

    return (
        <div className={'Combatant'}>
            <input
                className={'combatant-initiative'}
                value={props.initiative}
                onChange={(e) => updateCombatantInitiative(props.index, +e.target.value)}
                onFocus={(e) => e.target.select()}
            />
            <input
                className={'combatant-hp current'}
                type='number'
                value={hp}
                onChange={(e) => setHp(+e.target.value)}
                onFocus={(e) => e.target.select()}
            />
            <button
                className={'combatant-attack'}
                onClick={handleAttack}
                disabled={!damage}
            >
                <GiSaberSlash />
            </button>
            <input
                className={`combatant-hp damage ${damage === 0 ? 'empty' : ''}`}
                type='number'
                value={damage}
                onChange={(e) => setDamage(+e.target.value)}
                onFocus={(e) => e.target.select()}
            />
            <div className={'combatant-index'}>{props.index}</div>
            <div className={'combatant-conditions'}>
                <div className={'list'}>
                    {props.conditions.map((con) => <Condition
                        key={con.index}
                        combatant_index={props.index}
                        index={con.index}
                        level={con.level}
                        label={con.label}
                    />)}
                </div>
                <input
                    className={`combatant-add-condition`}
                    value={condition}
                    onChange={handleAddCondition}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <button
                className={'combatant-remove'}
                onClick={handleRemove}
            >
                <MdOutlineRemoveCircle />
            </button>

        </div>
    );
};

export default Combatant;