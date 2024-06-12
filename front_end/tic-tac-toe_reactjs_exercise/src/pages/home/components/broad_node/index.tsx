import classNames from 'classnames/bind';
import style from './style.module.scss';
import { useContext } from 'react';
import { turnContext } from '../..';

const cx = classNames.bind(style);

interface IBroadNodeProps {
    node: BroadNodeType;
    changeNode: (node: BroadNodeType) => void;
}

export type BroadNodeType = {
    index: number;
    row: number;
    value?: string;
    id: number;
    width?: number;
    height?: number;
};

function BroadNode({ node, changeNode }: IBroadNodeProps) {
    const turnNow = useContext(turnContext);

    return (
        <button
            className={cx('broad_node')}
            style={{ color: `${node?.value === 'o' ? 'red' : 'black'}` }}
            disabled={node.value ? true : false}
            onClick={() => {
                turnNow.ChangeTurn(!turnNow.turn_now);
                changeNode(node);
            }}
        >
            {node.value}
        </button>
    );
}

export default BroadNode;
