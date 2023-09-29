import { useState } from 'react';
import useCombatantStore from '../../hooks/useCombatantStore';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import './Condition.css';

const Condition = (props: {
    combatant_index: number,
    index: number,
    level: number,
    label: string,
}) => {
    const [level, setLevel] = useState(props.level);
    const updateConditionLevel = useCombatantStore((state) => state.updateConditionLevel);
    const removeCondition = useCombatantStore((state) => state.removeCondition);

    const handleRaiseLevel = () => {
        setLevel(level + 1);
        updateConditionLevel(props.combatant_index, props.index, level + 1);
    };

    const handleLowerLevel = () => {
        if (level === 1) {
            removeCondition(props.combatant_index, props.index);
        } else {
            setLevel(level - 1);
            updateConditionLevel(props.combatant_index, props.index, level - 1);
        }
    };

    return (
        <div className={'Condition'}>
            <button onClick={handleLowerLevel}><AiFillMinusCircle /></button>
            <div className={'content'}>{props.label}<span>{level}</span></div>
            <button onClick={handleRaiseLevel}><AiFillPlusCircle /></button>
        </div>
    );
};

export default Condition;