import classNames from 'classnames/bind';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

interface IPoppup {
    index?: number;
    title: string;
    content: string;
    onClose: () => void;
    onDelete: (index: any | null) => void;
}

function PoppupComp({ index, title, content, onClose, onDelete }: IPoppup) {
    return (
        <div className={cx('wrap_poppup')}>
            <i className={cx('icon')} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} />
            </i>
            <h1 className={cx('title')}>{title}</h1>
            <p className={cx('content')}>{content}</p>
            <div className={cx('wrap_btn')}>
                <button
                    className={cx('btn_delete')}
                    onClick={() => {
                        onDelete(index);
                        onClose();
                    }}
                >
                    Xoá
                </button>
                <button className={cx('btn_cancel')} onClick={onClose}>
                    Huỷ
                </button>
            </div>
        </div>
    );
}

export default PoppupComp;
