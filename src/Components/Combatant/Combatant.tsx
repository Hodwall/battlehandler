import { useState } from 'react';
import useCombatantStore from '../../hooks/useCombatantStore';
import { GiSaberSlash } from 'react-icons/gi';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import './Combatant.css';


const Combatant = (props: {
    index: number,
    initiative: number,
    hp: number,
}) => {
    const [hp, setHp] = useState(props.hp);
    const [damage, setDamage] = useState(0);
    const removeCombatant = useCombatantStore((state) => state.removeCombatant);
    const updateCombatantInitiative = useCombatantStore((state) => state.updateCombatantInitiative);

    const handleRemove = () => {
        removeCombatant(props.index);
    };

    const handleAttack = () => {
        setHp(hp - damage);
        setDamage(0);
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