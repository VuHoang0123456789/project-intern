import classNames from 'classnames/bind';
import style from './style.module.scss';
import { Student } from '../../pages/home';
import { ChangeEvent } from 'react';

const cx = classNames.bind(style);

interface ITableProps {
    student: Student[];
    fatulty: any;
    listIndex: number[];
    onSelected: (index: number) => void;
    onChecked: (index: number) => void;
    onUnChecked: (index: number) => void;
    DeleteItem: (index: number) => void;
}

function Table({ student, fatulty, listIndex, onSelected, onChecked, onUnChecked, DeleteItem }: ITableProps) {
    return (
        <table>
            <tbody>
                <tr>
                    <th className={cx('header_row', 'check_box-column', ' center')}></th>
                    <th className={cx('header_row', ' left')}>Mã sinh viên</th>
                    <th className={cx('header_row', 'left', 'min_width-200')}>Tên sinh viên</th>
                    <th className={cx('header_row', 'center', 'min_width-100')}>Ngày sinh</th>
                    <th className={cx('header_row', 'center ', 'min_width-100')}>Giới tính</th>
                    <th className={cx('header_row', 'left')}>Khoa</th>
                    <th className={cx('header_row', 'center ', 'min_width-100')}>Thao tác</th>
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
                            <td className={cx('row', 'left')}>{item.studentId}</td>
                            <td className={cx('row', 'left', 'min_width-200')}>{item.studentName}</td>
                            <td className={cx('row', 'center', 'min_width-100')}>{item.birthDay}</td>
                            <td className={cx('row', 'center', 'min_width-100')}>{item.geneder ? 'Nam' : 'Nữ'}</td>
                            <td className={cx('row', 'left')}>{fatulty[item.fatultyId]}</td>
                            <td className={cx('row', 'center', 'min_width-100')}>
                                <button
                                    className={cx('btn')}
                                    onClick={() => {
                                        onSelected(index);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button
                                    className={cx('btn')}
                                    onClick={() => {
                                        DeleteItem(index);
                                    }}
                                >
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Table;
