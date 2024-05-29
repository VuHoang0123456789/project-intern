import Broad from './components/broad';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import TurnComp, { TurnType } from './components/form_turn';
import { createContext, useState } from 'react';
import { BroadNodeType } from './components/broad_node';

const cx = classNames.bind(style);

export const turnContext = createContext<TurnType>({} as TurnType);

function HomePage() {
    const [turnNow, setTurnNow] = useState<TurnType>({ x: 0, o: 0, turn_now: true, ChangeTurn: ChangeTurn });

    function ChangeTurn(turn: boolean) {
        setTurnNow((prev) => {
            return { ...prev, turn_now: turn };
        });
    }

    function SetTurn(turn: TurnType) {
        setTurnNow(turn);
    }

    return (
        <turnContext.Provider value={turnNow}>
            <main className={cx('home_page')}>
                <div className={cx('container')}>
                    <h1 style={{ marginTop: '20px' }}>Tic Tac Toe</h1>
                    <TurnComp turn={turnNow} />
                    <Broad SetTurn={SetTurn} />
                </div>
            </main>
        </turnContext.Provider>
    );
}

export default HomePage;
