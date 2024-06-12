import Broad from './components/broad';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import TurnComp, { TurnType } from './components/form_turn';
import { ChangeEvent, createContext, useState } from 'react';

const cx = classNames.bind(style);

export const turnContext = createContext<TurnType>({} as TurnType);
export type BroadType = {
    is_create: boolean;
    size: number;
};

function HomePage() {
    const [turnNow, setTurnNow] = useState<TurnType>({ x: 0, o: 0, turn_now: true, ChangeTurn: ChangeTurn });
    const [broad, setBroad] = useState({
        is_create: false,
        size: 3,
    });

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

                    <div className={cx('wrap')}>
                        <div className={cx('wrap_create-table')}>
                            <div className={cx('input_w')}>
                                <label>Kích thước: </label>
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        let value = parseInt(e.target.value);

                                        if (value < 3) value = 3;
                                        if (value > 10) value = 10;

                                        setBroad({ ...broad, size: value });
                                    }}
                                    name="row_count"
                                    value={broad.size}
                                    type="number"
                                    max={10}
                                    min={3}
                                />
                            </div>
                        </div>
                        <div className={cx('wrap_turn')}>
                            <TurnComp turn={turnNow} />
                        </div>
                    </div>

                    <Broad SetTurn={SetTurn} Broad={broad} />
                </div>
            </main>
        </turnContext.Provider>
    );
}

export default HomePage;
