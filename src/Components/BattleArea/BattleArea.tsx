import useCombatantStore from '../../hooks/useCombatantStore';
import Combatant from '../Combatant/Combatant';
import './BattleArea.css';


const BattleArea = () => {
    const combatants = useCombatantStore((state) => state.combatants);
    return (
        <div className={'BattleArea'}>
            {combatants.map((c) => <Combatant index={c.index || 0} initiative={c.initiative} hp={c.hp || 0} />)}
        </div>
    );
};

export default BattleArea;