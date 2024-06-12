import classNames from 'classnames/bind';
import style from './style.module.scss';
import { Student, conTextType, homePageContext } from '../../pages/home';
import { ChangeEvent, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import PoppupComp from '../pop_pup';
import 'reactjs-popup/dist/index.css';

const cx = classNames.bind(style);

interface IWrapChangeProps {
    student: Student;
    faculty: any;
    isUpdate: boolean;
    listStudentCodes: string[];
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
    isDisable?: boolean;
};

function WrapChange({
    student,
    faculty,
    isUpdate,
    listStudentCodes,
    AddNewItem,
    UpdateItem,
    DeleteItem,
    ChangeStudent,
}: IWrapChangeProps) {
    const inputs: inputType[] = [
        {
            title: 'Mã sinh viên',
            name: 'student_code',
            placeholder: 'Mã sinh viên',
            error_msg: 'Vui lòng nhập mã sinh viên',
            isDisable: isUpdate,
        },
        {
            title: 'Tên sinh viên',
            name: 'student_name',
            placeholder: 'Tên sinh viên',
            error_msg: 'Vui lòng nhập tên sinh viên',
        },
        {
            title: 'Ngày sinh',
            name: 'birth_day',
            placeholder: 'Ngày sinh',
            type: 'Date',
            error_msg: 'Vui lòng nhập ngày sinh',
        },
    ] as inputType[];

    const [keys, setkeys] = useState<string[]>([]);
    const { isDisableBtn, setISDisaleBtn }: conTextType = useContext(homePageContext);

    function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        if (e.target.type === 'radio') {
            ChangeStudent({ ...student, [e.target.name]: e.target.value });
            return;
        }

        ChangeStudent({ ...student, [e.target.name]: e.target.value });
    }

    function ValidateInputs() {
        let newkeys: string[] = [];

        Object.keys(student).forEach((key: string) => {
            const value = student[key as keyof Student].toString();

            if (value.replace(/\s/g, '').length === 0) {
                newkeys.push(key);
            }
        });

        if (newkeys.length === 0) {
            setkeys([]);
            return;
        }

        setkeys(newkeys);

        return newkeys.length > 0;
    }

    function FormartDateOfValue(key: string, value: any) {
        if (key === 'birth_day') {
            const date = new Date(value);

            return [
                date.getFullYear(),
                date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
                date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`,
            ].join('-');
        }

        return value;
    }

    return (
        <div>
            <div className={cx('wrap_btn')}>
                <button
                    disabled={isDisableBtn}
                    className={cx('btn', 'btn_add-js')}
                    onClick={() => {
                        if (ValidateInputs()) return;

                        setISDisaleBtn(true);
                        AddNewItem(student);
                    }}
                >
                    Thêm mới
                </button>
                <button
                    disabled={isDisableBtn}
                    className={cx('btn', 'btn_update-js')}
                    onClick={() => {
                        if (ValidateInputs()) return;

                        setISDisaleBtn(true);
                        UpdateItem(student.student_code, student);
                    }}
                >
                    Cập nhật
                </button>
                <Popup
                    trigger={
                        <button className={cx('btn', 'btn_delete-js')} disabled={isDisableBtn}>
                            Xoá
                        </button>
                    }
                    modal
                    nested
                    disabled={listStudentCodes.length === 0}
                >
                    {(close) => (
                        <PoppupComp
                            onClose={() => close()}
                            onDelete={DeleteItem}
                            title="Xoá thông tin"
                            content="Bạn có chắc muốn xoá thông tin của các sinh viên này không?Khi đã xoá sẽ không khôi phục lại được."
                        />
                    )}
                </Popup>
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
                                value={FormartDateOfValue(item.name, student[item.name as keyof Student])}
                                onChange={onChange}
                                type={item?.type || 'Text'}
                                name={item.name}
                                placeholder={item.placeholder}
                                required
                                disabled={item?.isDisable}
                            />
                            <p className={cx('error_msg', !keys.includes(item.name) || 'show')}>{item.error_msg}</p>
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
                            checked={student?.geneder === 'male'}
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
                            value="female"
                            onChange={onChange}
                            checked={student?.geneder === 'female'}
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

                <select name="factulty_id" id="faculty" required onChange={onChange} value={student?.factulty_id}>
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
