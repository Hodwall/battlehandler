import { useState } from 'react';
import useCombatantStore from '../../hooks/useCombatantStore';
import { diceRoll } from '../../utils/roll';
import { GiRallyTheTroops } from 'react-icons/gi';
import './AddCombatant.css';


const AddCombatant = () => {
    const [initiative, setInitiative] = useState(0);
    const [hp, setHp] = useState(0);
    const [amount, setAmount] = useState(1);
    const addCombatant = useCombatantStore((state) => state.addCombatant);

    const handleClick = () => {
        for (let i = 0; i < amount; i++) {
            addCombatant({
                initiative: diceRoll(20) + initiative,
                hp: hp,
            });
        }
        setInitiative(0);
        setHp(0);
        setAmount(0);
    };

    return (
        <div className={'AddCombatant'}>
            <div className={'label'}>INI</div>
            <div className={'label'}>HP</div>
            <div className={'label'}>AMOUNT</div>
            <div></div>
            <input
                className={'initiative'}
                type='number'
                value={initiative}
                onChange={(e) => setInitiative(+e.target.value)}
                onFocus={(e) => e.target.select()}
            />
            <input
                className={'hp'}
                type='number'
                value={hp}
                onChange={(e) => setHp(+e.target.value)}
                onFocus={(e) => e.target.select()}
            />
            <input
                className={'amount'}
                type='number'
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                onFocus={(e) => e.target.select()}
            />
            <button
                onClick={handleClick}
            >
                <GiRallyTheTroops />
            </button>
        </div>
    );
};

export default AddCombatant;