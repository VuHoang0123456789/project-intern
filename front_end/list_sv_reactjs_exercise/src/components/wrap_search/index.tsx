import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);

function WrapSearch({ Search }: { Search: (value: string) => void }) {
    return (
        <div className={cx('container')}>
            <label>Từ khoá:</label>
            <input
                placeholder="Từ tìm tiếm"
                onChange={(e) => {
                    setTimeout(() => {
                        Search(e.target.value);
                    }, 1000);
                }}
            />
            <button>Tìm kiếm</button>
        </div>
    );
}

export default WrapSearch;
