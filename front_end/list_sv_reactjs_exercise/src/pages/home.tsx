import classNames from 'classnames/bind';
import style from './home.module.scss';
import WrapSearch from '../components/wrap_search';
import Table from '../components/wrap_table';
import { useEffect, useState } from 'react';
import WrapChange from '../components/wrap_change';

const cx = classNames.bind(style);

export type Student = {
    studentId: string;
    studentName: string;
    birthDay: string;
    geneder: boolean;
    fatultyId: string;
};

export type Fatulty = {
    facultyId: string;
    facultyName: string;
};

function HomePage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentsDefault, setStudentsDefault] = useState<Student[]>([]);
    const [fatultly, setFatuly] = useState({
        cntt: 'Công nghệ thông tin',
        nna: 'Ngôn ngữ anh',
        dl: 'Du lịch',
        mt: 'Môi trường',
    });

    const [student, setStudent] = useState<Student>({
        studentId: '',
        studentName: '',
        birthDay: '',
        geneder: true,
        fatultyId: 'cntt',
    } as Student);

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const [listIndex, setListIndex] = useState<number[]>([]);

    useEffect(() => {
        let students: Student[] = [
            {
                studentId: '191211001',
                studentName: 'Vũ Huy Hoàng',
                birthDay: '2001-06-12',
                geneder: true,
                fatultyId: 'cntt',
            },
            {
                studentId: '191211002',
                studentName: 'Vũ Quốc Huy',
                birthDay: '2001-05-06',
                geneder: true,
                fatultyId: 'nna',
            },
            {
                studentId: '191211003',
                studentName: 'Nguyễn Thị Huệ',
                birthDay: '2001-01-17',
                geneder: false,
                fatultyId: 'dl',
            },
            {
                studentId: '191211004',
                studentName: 'Nguyễn Đình Quyết',
                birthDay: '2001-02-28',
                geneder: true,
                fatultyId: 'mt',
            },
            {
                studentId: '191211005',
                studentName: 'Lê Duy Quang',
                birthDay: '2001-09-21',
                geneder: true,
                fatultyId: 'cntt',
            },
            {
                studentId: '191211006',
                studentName: 'Phạm Thị Ngọc Anh',
                birthDay: '2001-06-15',
                geneder: false,
                fatultyId: 'cntt',
            },
            {
                studentId: '191211007',
                studentName: 'Lương Thị Thuỷ',
                birthDay: '2001-03-07',
                geneder: false,
                fatultyId: 'dl',
            },
            {
                studentId: '191211008',
                studentName: 'Phạm Mạnh Chính',
                birthDay: '2001-01-20',
                geneder: true,
                fatultyId: 'cntt',
            },
            {
                studentId: '191211009',
                studentName: 'Nguyễn Văn Lương',
                birthDay: '2001-09-22',
                geneder: true,
                fatultyId: 'cntt',
            },
            {
                studentId: '191211010',
                studentName: 'Nguyễn Tuấn Hùng',
                birthDay: '2001-04-29',
                geneder: true,
                fatultyId: 'dl',
            },
        ];

        setStudents(students);
        setStudentsDefault(students);
    }, []);

    useEffect(() => {
        if (selectedIndex === -1) return;

        setStudent(students[selectedIndex]);
    }, [selectedIndex]);

    function AddNewItem(item: Student) {
        const newStudents = [...students];
        newStudents.push(item);
        setStudents(newStudents);
    }

    function UpdateItem(studentId: string, student: Student) {
        const findIndex = students.findIndex((student) => student.studentId === studentId);
        const newStudents = [...students];
        newStudents.splice(findIndex, 1, student);

        setStudents(newStudents);
    }

    function DeleteMutipleItem() {
        const newStudents = students.filter((intem, index) => listIndex.indexOf(index) === -1);

        setStudents(newStudents);
        setListIndex([]);
    }

    function DeleteItem(index: number) {
        const newStudents = [...students];
        newStudents.splice(index, 1);

        setStudents(newStudents);
        setListIndex([]);
    }

    function Selected(index: number) {
        setSelectedIndex(index);
    }

    function ChangeStudent(student: Student) {
        setStudent(student);
    }

    function AddListIndex(index: number) {
        const newList = [...listIndex];

        newList.push(index);

        setListIndex(newList);
    }
    function RemoveListIndex(index: number) {
        const newList = [...listIndex];

        const DeleteIndex = newList.findIndex((item) => item === index);

        if (DeleteIndex === -1) return;

        newList.splice(DeleteIndex, 1);

        setListIndex(newList);
    }

    function Search(value: string) {
        const newStudent = studentsDefault.filter((student: Student) =>
            Object.values(student).some((item) => {
                return item.toString().toUpperCase().includes(value.toUpperCase());
            }),
        );

        setStudents(newStudent);
    }

    return (
        <div className={cx('home_pages')}>
            <h1 className={cx('title')}>Danh sách sinh viên</h1>
            <div className={cx('wrap')}>
                <div className={cx('wrap_search')}>
                    <WrapSearch Search={Search} />
                </div>
                <div className={cx('content')}>
                    <div className={cx('wrap_table')}>
                        <h2>Kết quả tím kiếm:</h2>
                        <Table
                            student={students}
                            fatulty={fatultly}
                            listIndex={listIndex}
                            onSelected={Selected}
                            onChecked={AddListIndex}
                            onUnChecked={RemoveListIndex}
                            DeleteItem={DeleteItem}
                        />
                    </div>
                    <div className={cx('wrap_chang')}>
                        <WrapChange
                            student={student}
                            faculty={fatultly}
                            AddNewItem={AddNewItem}
                            UpdateItem={UpdateItem}
                            DeleteItem={DeleteMutipleItem}
                            ChangeStudent={ChangeStudent}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
