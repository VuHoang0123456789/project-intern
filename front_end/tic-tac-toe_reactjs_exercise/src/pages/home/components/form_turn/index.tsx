import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);

export type TurnType = {
    x: number;
    o: number;
    turn_now: boolean;
    ChangeTurn: (turn: boolean) => void;
};

function TurnComp({ turn }: { turn: TurnType }) {
    return (
        <div className={cx('turn_comp')}>
            <div className={cx('wrap_x_o', turn.turn_now ? 'selected' : '')} onClick={() => turn.ChangeTurn(true)}>
                <h2>X</h2>
                <p>{turn.x}</p>
            </div>
            <div className={cx('wrap_x_o', !turn.turn_now ? 'selected' : '')} onClick={() => turn.ChangeTurn(false)}>
                <h2>O</h2>
                <p>{turn.o}</p>
            </div>
        </div>
    );
}

export default TurnComp;
