import classNames from 'classnames/bind';
import style from './style.module.scss';
import BroadNode from '../broad_node';
import { BroadNodeType } from '../broad_node';
import { useContext, useEffect, useState } from 'react';
import { turnContext } from '../..';
import { TurnType } from '../form_turn';

const cx = classNames.bind(style);

interface IBroadRowProps {
    node: BroadNodeType[];
    changeNode: (node: BroadNodeType) => void;
}

const BroadRow = function ({ node, changeNode }: IBroadRowProps) {
    return (
        <div className={cx('broad_row')}>
            {node.map((item: BroadNodeType, index: number) => (
                <div key={index} className={cx('wrap_node')}>
                    <BroadNode node={item} changeNode={changeNode} />
                </div>
            ))}
        </div>
    );
};

function Broad({ SetTurn }: { SetTurn: (turn: TurnType) => void }) {
    const turnNow = useContext(turnContext);
    const [broads, setBroads] = useState<BroadNodeType[][]>([
        [
            { id: 1, index: 0, row: 0 },
            { id: 2, index: 1, row: 0 },
            { id: 3, index: 2, row: 0 },
        ],
        [
            { id: 4, index: 0, row: 1 },
            { id: 5, index: 1, row: 1 },
            { id: 6, index: 2, row: 1 },
        ],
        [
            { id: 7, index: 0, row: 2 },
            { id: 8, index: 1, row: 2 },
            { id: 9, index: 2, row: 2 },
        ],
    ]);

    const winPos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    const [wins, setWins] = useState<BroadNodeType[]>([]);
    const [count, setCount] = useState(0);
    const [winner, setWinner] = useState(-1);

    function changeNode(node: BroadNodeType) {
        const newTurnNow: BroadNodeType[][] = [...broads];
        const value = turnNow.turn_now ? 'x' : 'o';
        const newNode = { ...node, value };
        newTurnNow[node.row].splice(node.index, 1, newNode);

        setCount((prev) => (prev += 1));
        setBroads(newTurnNow);
    }

    useEffect(() => {
        const value = turnNow.turn_now ? 'o' : 'x';
        const list_1 = broads[0].filter((item) => {
            return item?.value === value;
        });
        const list_2 = broads[1].filter((item) => {
            return item?.value === value;
        });
        const list_3 = broads[2].filter((item) => {
            return item?.value === value;
        });

        setWins([...list_1, ...list_2, ...list_3]);
    }, [broads, turnNow]);

    useEffect(() => {
        if (wins.length < 3) return;

        const isCheckwin = winPos.filter((item) => {
            let isWin = true;
            for (let index = 0; index < item.length; index++) {
                const findIndex = wins.findIndex((win: BroadNodeType) => win.id === item[index]);

                if (findIndex === -1) {
                    isWin = false;
                    break;
                }
            }

            return isWin;
        });

        if (isCheckwin.length > 0 && turnNow.turn_now) {
            setWinner(-10);
            return;
        }
        if (isCheckwin.length > 0 && !turnNow.turn_now) {
            setWinner(10);
            return;
        }
        if (count >= 9) {
            setWinner(0);
            return;
        }
    }, [wins, count]);

    useEffect(() => {
        if (winner === -1) return;

        if (winner === 10) SetTurn({ ...turnNow, x: (turnNow.x += 1) });
        if (winner === -10) SetTurn({ ...turnNow, o: (turnNow.o += 1) });
    }, [winner]);

    function ClearBroad() {
        setBroads([
            [
                { id: 1, index: 0, row: 0 },
                { id: 2, index: 1, row: 0 },
                { id: 3, index: 2, row: 0 },
            ],
            [
                { id: 4, index: 0, row: 1 },
                { id: 5, index: 1, row: 1 },
                { id: 6, index: 2, row: 1 },
            ],
            [
                { id: 7, index: 0, row: 2 },
                { id: 8, index: 1, row: 2 },
                { id: 9, index: 2, row: 2 },
            ],
        ]);
        setWins([]);
        setWinner(-1);
        setCount(0);

        SetTurn({ ...turnNow, turn_now: true });
    }

    return (
        <div>
            {winner === -1 ? (
                <div className={cx('broad')}>
                    {broads.map((item, index) => (
                        <div className={cx('wrap_broad-row')} key={index}>
                            <BroadRow node={item} changeNode={changeNode} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('broad', 'none_border')}>
                    {winner === 10 && <h1>X Chiến thắng</h1>}
                    {winner === -10 && <h1>O Chiến thắng</h1>}
                    {winner === 0 && <h1>X O Hoà</h1>}
                </div>
            )}

            <button className={cx('btn_start')} onClick={ClearBroad}>
                Khởi động lại trò chơi
            </button>
        </div>
    );
}

export default Broad;
