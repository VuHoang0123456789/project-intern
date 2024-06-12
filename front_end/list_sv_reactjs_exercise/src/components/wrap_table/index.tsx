import classNames from 'classnames/bind';
import style from './style.module.scss';
import { Student } from '../../pages/home';
import { ChangeEvent, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import PoppupComp from '../pop_pup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpShortWide, faArrowUpWideShort, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan';

const cx = classNames.bind(style);

interface ITableProps {
    student: Student[];
    fatulty: any;
    listIndex: number[];

    onSort: (type: boolean, column: string) => void;
    onSelected: (index: number) => void;
    onChecked: (index: number) => void;
    onUnChecked: (index: number) => void;
    DeleteItem: (index: number) => void;
}

const SortIcon = function ({ column, onSort }: { column: string; onSort: (type: boolean, column: string) => void }) {
    const [asc, setAsc] = useState<boolean>(true);

    useEffect(() => {
        onSort(asc, column);
    }, [asc]);

    return (
        <i
            onClick={() => {
                setAsc(!asc);
            }}
        >
            <FontAwesomeIcon icon={asc ? faArrowUpWideShort : faArrowUpShortWide} />
        </i>
    );
};

function Table({ student, fatulty, listIndex, onSort, onSelected, onChecked, onUnChecked, DeleteItem }: ITableProps) {
    function FormatDate(date: Date) {
        return [
            date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`,
            date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
            date.getFullYear(),
        ].join('/');
    }

    function GetGeneder(geneder: string) {
        if (geneder === 'male') return 'Nam';

        if (geneder === 'female') return 'Nữ';

        return 'Khác';
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th className={cx('header_row', 'check_box-column', ' center')}></th>
                        <th className={cx('header_row', ' left')}>
                            Mã sinh viên <SortIcon onSort={onSort} column="student_code" />
                        </th>
                        <th className={cx('header_row', 'left', 'min_width-200')}>
                            Tên sinh viên <SortIcon onSort={onSort} column="student_name" />
                        </th>
                        <th className={cx('header_row', 'center', 'min_width-100')}>
                            Ngày sinh <SortIcon onSort={onSort} column="birth_day" />
                        </th>
                        <th className={cx('header_row', 'center ', 'min_width-100')}>Giới tính</th>
                        <th className={cx('header_row', 'left')}>Khoa</th>
                        <th className={cx('header_row', 'center ', 'min_width-50')}>Thao tác</th>
                    </tr>

                    {student.map((item: Student, index) => {
                        return (
                            <tr key={index}>
                                <td className={cx('row', 'row_checbox', 'center')}>
                                    <input
                                        type="checkbox"
                                        checked={listIndex.some((item) => item === index)}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e.target.checked) onChecked(index);
                                            else onUnChecked(index);
                                        }}
                                    />
                                </td>
                                <td className={cx('row', 'left')}>{item.student_code}</td>
                                <td className={cx('row', 'left', 'min_width-200')}>{item.student_name}</td>
                                <td className={cx('row', 'center', 'min_width-100')}>
                                    {FormatDate(new Date(item.birth_day))}
                                </td>
                                <td className={cx('row', 'center', 'min_width-100')}>{GetGeneder(item.geneder)}</td>
                                <td className={cx('row', 'left')}>{fatulty[item.factulty_id]}</td>
                                <td className={cx('row', 'center', 'min_width-50')}>
                                    <i
                                        className={cx('btn')}
                                        onClick={() => {
                                            onSelected(index);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </i>
                                    <Popup
                                        trigger={
                                            <i className={cx('btn')}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </i>
                                        }
                                        modal
                                        nested
                                    >
                                        {(close: () => void) => (
                                            <PoppupComp
                                                index={index}
                                                onClose={() => close()}
                                                onDelete={DeleteItem}
                                                title="Xoá thông tin"
                                                content="Bạn có chắc muốn xoá thông tin của sinh viên này không? Khi đã xoá sẽ không khôi phục được lại."
                                            />
                                        )}
                                    </Popup>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
