import classNames from 'classnames/bind';
import style from './style.module.scss';
import { Student } from '../../pages/home';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

const cx = classNames.bind(style);

interface IWrapChangeProps {
    student: Student;
    faculty: any;
    AddNewItem: (student: Student) => void;
    UpdateItem: (studentId: string, student: Student) => void;
    DeleteItem: () => void;
    ChangeStudent: (student: Student) => void;
}

type inputType = {
    title: string;
    name: string;
    placeholder: string;
    error_msg: string;
    type?: string;
};

function WrapChange({ student, faculty, AddNewItem, UpdateItem, DeleteItem, ChangeStudent }: IWrapChangeProps) {
    const inputs: inputType[] = [
        {
            title: 'Mã sinh viên',
            name: 'studentId',
            placeholder: 'Mã sinh viên',
            error_msg: 'Vui lòng nhập mã sinh viên',
        },
        {
            title: 'Tên sinh viên',
            name: 'studentName',
            placeholder: 'Tên sinh viên',
            error_msg: 'Vui lòng nhập tên sinh viên',
        },
        {
            title: 'Ngày sinh',
            name: 'birthDay',
            placeholder: 'Ngày sinh',
            type: 'Date',
            error_msg: 'Vui lòng nhập ngày sinh',
        },
    ] as inputType[];

    const [isDisabled, setIsdisabled] = useState(false);
    function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        if (e.target.type === 'radio') {
            const geneder = e.target.value === 'male' ? true : false;

            ChangeStudent({ ...student, [e.target.name]: geneder });
            return;
        }
        ChangeStudent({ ...student, [e.target.name]: e.target.value });
    }

    function ValidateInputs() {
        let keys: String[] = [];

        Object.keys(student).forEach((key: string) => {
            const value =
                typeof student[key as keyof Student] === 'string'
                    ? student[key as keyof Student]
                    : student[key as keyof Student].toString();

            if (value.replace(/\s/g, '').length === 0) {
                keys.push(key);
            }
        });

        return !keys.length > 0;
    }

    //student[item.name as keyof Student] || ''

    return (
        <div>
            <div className={cx('wrap_btn')}>
                <button
                    className={cx('btn', 'btn_add-js')}
                    onClick={() => {
                        setIsdisabled(true);
                        const isOk = ValidateInputs();

                        if (!isOk) return;

                        setIsdisabled(false);
                        AddNewItem(student);
                    }}
                >
                    Thêm mới
                </button>
                <button
                    className={cx('btn', 'btn_update-js')}
                    onClick={() => {
                        setIsdisabled(true);
                        const isOk = ValidateInputs();

                        if (!isOk) return;

                        setIsdisabled(false);
                        UpdateItem(student.studentId, student);
                    }}
                >
                    Cập nhật
                </button>
                <button
                    className={cx('btn', 'btn_delete-js')}
                    onClick={() => {
                        DeleteItem();
                    }}
                >
                    Xoá
                </button>
            </div>

            {inputs.map((item: inputType, index: number) => {
                return (
                    <div className={cx('wrap_input')} key={index}>
                        <label>
                            {item.title}
                            <span className={cx('requeid')}>(*)</span>:
                        </label>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                value={student[item.name as keyof Student]}
                                onChange={onChange}
                                type={item?.type || 'Text'}
                                name={item.name}
                                placeholder={item.placeholder}
                                required
                            />
                            <p className={cx('error_msg', !isDisabled || 'show')}>{item.error_msg}</p>
                        </div>
                    </div>
                );
            })}

            <div className={cx('wrap_input')}>
                <label>Giới tính:</label>
                <div className={cx('wrap_radio')}>
                    <div className={cx('wrap_radio-item')}>
                        <input
                            type="radio"
                            id="male"
                            name="geneder"
                            value="male"
                            onChange={onChange}
                            checked={student?.geneder}
                        />
                        <label className={cx('radio_lable')} htmlFor="male">
                            Nam
                        </label>
                        <br />
                    </div>
                    <div className={cx('wrap_radio-item')}>
                        <input
                            type="radio"
                            id="famale"
                            name="geneder"
                            value="famale"
                            onChange={onChange}
                            checked={!student?.geneder}
                        />
                        <label className={cx('radio_lable')} htmlFor="famale">
                            Nữ
                        </label>
                        <br />
                    </div>
                </div>
            </div>

            <div className={cx('wrap_input')}>
                <label>
                    Khoa <span className={cx('requeid')}>(*)</span>:{' '}
                </label>

                <select name="fatultyId" id="faculty" required onChange={onChange} value={student?.fatultyId}>
                    {Object.entries(faculty).map((item, index) => {
                        const fa = item as string[];
                        return (
                            <option key={index} value={fa[0]}>
                                {fa[1]}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

export default WrapChange;
