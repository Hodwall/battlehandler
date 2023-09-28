import useCombatantStore from '../../hooks/useCombatantStore';
import AddCombatant from '../AddCombatant/AddCombatant';
import './BattleTools.css';
import { TbSortDescending } from 'react-icons/tb';

const BattleTools = () => {
    const sortCombatants = useCombatantStore((state) => state.sortCombatants);
    return (
        <div className={'BattleTools'}>
            <AddCombatant />
            <button onClick={() => sortCombatants()}><TbSortDescending /></button>
        </div>
    );
};

export default BattleTools;