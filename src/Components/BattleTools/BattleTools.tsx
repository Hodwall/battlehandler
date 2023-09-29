import useCombatantStore from '../../hooks/useCombatantStore';
import AddCombatant from '../AddCombatant/AddCombatant';
import { TbSortDescending, TbCircleX } from 'react-icons/tb';
import './BattleTools.css';

const BattleTools = () => {
    const sortCombatants = useCombatantStore((state) => state.sortCombatants);
    const removeAllCombatants = useCombatantStore((state) => state.removeAllCombatants);

    return (
        <div className={'BattleTools'}>
            <AddCombatant />
            <button onClick={() => sortCombatants()}><TbSortDescending /></button>
            <button onClick={() => removeAllCombatants()}><TbCircleX /></button>
        </div>
    );
};

export default BattleTools;