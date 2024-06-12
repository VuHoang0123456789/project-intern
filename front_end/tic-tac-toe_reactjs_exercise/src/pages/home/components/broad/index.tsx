import classNames from 'classnames/bind';
import style from './style.module.scss';
import BroadNode from '../broad_node';
import { BroadNodeType } from '../broad_node';
import { useContext, useEffect, useState } from 'react';
import { BroadType, turnContext } from '../..';
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
                <div
                    key={index}
                    className={cx('wrap_node')}
                    style={{ width: `${item.width}px`, height: `${item.height}px` }}
                >
                    <BroadNode node={item} changeNode={changeNode} />
                </div>
            ))}
        </div>
    );
};

function Broad({ SetTurn, Broad }: { SetTurn: (turn: TurnType) => void; Broad: BroadType }) {
    const turnNow = useContext(turnContext);
    const [broads, setBroads] = useState<BroadNodeType[][]>([]);
    const maxSize = 400;
    const [count, setCount] = useState(0);
    const [winner, setWinner] = useState(-1);

    useEffect(() => {
        const newBroads = [];
        for (let x = 0; x < Broad.size; x++) {
            const row = [];

            for (let y = 0; y < Broad.size; y++) {
                row.push({
                    id: y,
                    index: y,
                    row: x,
                    width: maxSize / Broad.size,
                    height: maxSize / Broad.size,
                });
            }

            newBroads.push(row);
        }

        setBroads(newBroads);
    }, [Broad]);

    function changeNode(node: BroadNodeType) {
        const newTurnNow: BroadNodeType[][] = [...broads];
        const value = turnNow.turn_now ? 'x' : 'o';
        const newNode = { ...node, value };
        newTurnNow[node.row].splice(node.index, 1, newNode);

        const isWin = Check_Horizontal(newNode.index, newNode.row, newNode?.value, Broad.size - 1);

        if (isWin) {
            const winner = newNode?.value === 'x' ? 10 : -10;
            setWinner(winner);
        }

        setCount((prev) => (prev += 1));
        setBroads(newTurnNow);
    }

    function Check_Horizontal(x: number, y: number, value: string, size: number) {
        const x1 = x - 1;
        const x2 = x - 2;
        const x3 = x + 1;
        const x4 = x + 2;
        let isWin = false;

        if (x1 >= 0 && x3 <= size) {
            if (broads[y][x1]?.value === value && broads[y][x3]?.value === value) {
                isWin = true;
                return true;
            }
        }

        if (x1 >= 0 && x2 >= 0) {
            if (broads[y][x1]?.value === value && broads[y][x2].value === value) {
                isWin = true;
                return true;
            }
        }

        if (x3 <= size && x4 <= size) {
            if (broads[y][x3]?.value === value && broads[y][x4].value === value) {
                isWin = true;
                return true;
            }
        }

        if (!isWin) return Check_vertical(x, y, value, size);
        else return isWin;
    }

    function Check_vertical(x: number, y: number, value: string, size: number) {
        const y1 = y - 1;
        const y2 = y - 2;
        const y3 = y + 1;
        const y4 = y + 2;
        let isWin = false;

        if (y1 >= 0 && y3 <= size) {
            if (broads[y1][x]?.value === value && broads[y3][x]?.value === value) {
                isWin = true;
                return true;
            }
        }

        if (y1 >= 0 && y2 >= 0) {
            if (broads[y1][x]?.value === value && broads[y2][x].value === value) {
                isWin = true;
                return true;
            }
        }

        if (y3 <= size && y4 <= size) {
            if (broads[y3][x]?.value === value && broads[y4][x].value === value) {
                isWin = true;
                return true;
            }
        }

        if (!isWin) return Check_Cross_1(x, y, value, size);
        else return isWin;
    }

    function Check_Cross_1(x: number, y: number, value: string, size: number) {
        const x1 = x - 1;
        const x2 = x - 2;
        const x3 = x + 1;
        const x4 = x + 2;

        const y1 = y - 1;
        const y2 = y - 2;
        const y3 = y + 1;
        const y4 = y + 2;

        let isWin = false;

        if (x1 >= 0 && y1 >= 0 && x3 <= size && y3 <= size) {
            if (broads[y1][x1]?.value === value && broads[y3][x3]?.value === value) {
                isWin = true;
                return true;
            }
        }

        if (x1 >= 0 && y1 >= 0 && x2 >= 0 && y2 >= 0) {
            if (broads[y1][x1]?.value === value && broads[y2][x2]?.value === value) {
                isWin = true;
                return true;
            }
        }

        if (x3 <= size && y3 <= size && x4 <= size && y4 <= size) {
            if (broads[y3][x3]?.value === value && broads[y4][x4]?.value === value) {
                isWin = true;
                return true;
            }
        }

        if (!isWin) return Check_Cross_2(x, y, value, size);
        else return isWin;
    }
    function Check_Cross_2(x: number, y: number, value: string, size: number) {
        const x1 = x - 1;
        const x2 = x - 2;
        const x3 = x + 1;
        const x4 = x + 2;

        const y1 = y - 1;
        const y2 = y - 2;
        const y3 = y + 1;
        const y4 = y + 2;

        if (x1 >= 0 && y3 <= size && x3 <= size && y1 >= 0) {
            if (broads[y3][x1]?.value === value && broads[y1][x3]?.value === value) {
                return true;
            }
        }

        if (x1 >= 0 && y3 <= size && x2 >= 0 && y4 <= size) {
            if (broads[y3][x1]?.value === value && broads[y4][x2]?.value === value) {
                return true;
            }
        }

        if (x3 <= size && y1 >= 0 && x4 <= size && y2 >= 0) {
            if (broads[y1][x3]?.value === value && broads[y2][x4]?.value === value) {
                return true;
            }
        }

        return false;
    }

    useEffect(() => {
        if (winner === -1 && count === Math.pow(Broad.size, 2)) {
            setWinner(0);
        }

        if (winner === 10) SetTurn({ ...turnNow, x: (turnNow.x += 1) });
        if (winner === -10) SetTurn({ ...turnNow, o: (turnNow.o += 1) });
    }, [winner, count]);

    function ClearBroad() {
        const newBroads = [];
        for (let x = 0; x < Broad.size; x++) {
            const row = [];

            for (let y = 0; y < Broad.size; y++) {
                row.push({
                    id: y,
                    index: y,
                    row: x,
                    width: maxSize / Broad.size,
                    height: maxSize / Broad.size,
                });
            }

            newBroads.push(row);
        }

        setBroads(newBroads);
        setWinner(-1);
        setCount(0);
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
