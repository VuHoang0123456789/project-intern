import classNames from 'classnames/bind';
import style from './home.module.scss';
import WrapSearch from '../components/wrap_search';
import Table from '../components/wrap_table';
import { createContext, useEffect, useState } from 'react';
import WrapChange from '../components/wrap_change';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';

const cx = classNames.bind(style);

export type Student = {
    student_id: number;
    student_code: string;
    student_name: string;
    birth_day: string;
    geneder: string;
    factulty_id: number;
};

export type Fatulty = {
    facultyId: string;
    facultyName: string;
};

interface IFatulty {
    [key: string]: any;
}

export type conTextType = {
    isDisableBtn: boolean;
    setISDisaleBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const homePageContext = createContext<conTextType>({} as conTextType);

function HomePage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentsDefault, setStudentsDefault] = useState<Student[]>([]);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [fatultly, setFatuly] = useState<IFatulty>({});
    const [isDisableBtn, setISDisaleBtn] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string | null>();

    const [student, setStudent] = useState<Student>({
        student_id: -1,
        student_name: '',
        student_code: '',
        birth_day: '',
        geneder: 'male',
        factulty_id: 1,
    } as Student);

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const [listIndex, setListIndex] = useState<number[]>([]);
    const [listStudentCodes, setListStudentCodes] = useState<string[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
    });

    useEffect(() => {
        setIsUpdate(false);

        setStudent({
            student_id: -1,
            student_name: '',
            student_code: '',
            birth_day: '',
            geneder: 'male',
            factulty_id: 1,
        });
    }, [studentsDefault]);

    useEffect(() => {
        fetch('https://localhost:7117/api/v1/factulty/get-factulties', {
            method: 'get',
            headers: {
                'Content-type': 'aplication/json',
            },
        })
            .then(async (res) => {
                if (res.status !== 200) return;
                const obj: IFatulty = {};
                const factulties = await res.json();
                factulties.forEach((factulty_item: any) => {
                    obj[factulty_item.factulty_id] = factulty_item.factulty_name;
                });
                setFatuly(obj);
            })
            .catch((error) => console.log(error));
        fetch(
            `https://localhost:7117/api/v1/student/get-students?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`,
            {
                method: 'get',
                headers: {
                    'Content-type': 'aplication/json',
                },
            },
        )
            .then(async (res) => {
                if (res.status !== 200) return;
                const studentDb = await res.json();
                setPagination({ ...pagination, totalPage: studentDb._totalPage });
                setStudents(studentDb._paginationList);
                setStudentsDefault(studentDb._paginationList);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (selectedIndex === -1) return;

        setStudent(students[selectedIndex]);
    }, [selectedIndex]);

    function AddNewItem(item: Student) {
        fetch('https://localhost:7117/api/v1/student/add-student', {
            method: 'Post',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify(student),
        })
            .then(async (res) => {
                setISDisaleBtn(false);
                if (res.status > 201 || res.status < 200) {
                    toast('Thêm mới sinh viên không thành công.');
                    return;
                }

                const newStudents = [...students];
                const newStudentsDefault = [...studentsDefault];
                newStudents.unshift(item);
                newStudentsDefault.unshift(item);

                setStudentsDefault(newStudentsDefault);
                setStudents(newStudents);

                toast('Thêm mới sinh viên thành công.');
            })
            .catch((error) => {
                setISDisaleBtn(false);
                console.log(error);
            });
    }

    function UpdateItem(studentId: string, student: Student) {
        fetch(`https://localhost:7117/api/v1/student/update-student/${student.student_code}`, {
            method: 'put',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify(student),
        })
            .then((res) => {
                setISDisaleBtn(false);
                if (res.status > 201 || res.status < 200) {
                    toast('Cập nhật thông tin không thành công.');
                    return;
                }

                const findIndex = students.findIndex((student) => student.student_code === studentId);
                const newStudents = [...students];
                const newStudentsDefault = [...studentsDefault];
                newStudents.splice(findIndex, 1, student);
                newStudentsDefault.splice(findIndex, 1, student);

                setStudentsDefault(newStudentsDefault);
                setStudents(newStudents);
                setSelectedIndex(-1);
                toast('Cập nhật thông tin sinh viên thành công.');
            })
            .catch((error) => {
                setISDisaleBtn(false);
                console.log(error);
            });
    }

    function DeleteMutipleItem() {
        fetch(`https://localhost:7117/api/v1/student/delete-mutile-student`, {
            method: 'delete',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify(listStudentCodes),
        })
            .then((res) => {
                setISDisaleBtn(false);
                if (res.status > 201 || res.status < 200) {
                    toast('Xoá thông tin sinh viên không thành công');
                    return;
                }

                const newStudents = students.filter((_item, index) => listIndex.indexOf(index) === -1);

                const newStudentsDefault = studentsDefault.filter((item) => {
                    return !listStudentCodes.includes(item.student_code);
                });

                setStudents(newStudents);
                setStudentsDefault(newStudentsDefault);
                setListIndex([]);

                toast('Xoá thông tin sinh viên thành công');
            })
            .catch((error) => {
                setISDisaleBtn(false);
                console.log(error);
            });
    }

    function DeleteItem(index: number) {
        fetch(`https://localhost:7117/api/v1/student/delete-student/${students[index].student_code}`, {
            method: 'delete',
            headers: {
                'Content-type': 'Application/json',
            },
        })
            .then((res) => {
                setISDisaleBtn(false);
                if (res.status > 201 || res.status < 200) {
                    toast('Xoá thông tin sinh viên không thành công');
                    return;
                }

                const newStudents = [...students];
                const newDefaultStudents = [...studentsDefault];

                const deleteIndex = newDefaultStudents.findIndex(
                    (item) => item.student_code === newStudents[index].student_code,
                );

                if (deleteIndex === -1) {
                    return;
                }

                newStudents.splice(index, 1);
                newDefaultStudents.splice(deleteIndex, 1);

                setStudents(newStudents);
                setStudentsDefault(newDefaultStudents);
                setListIndex([]);

                toast('Xoá thông tin sinh viên thành công.');
            })
            .catch((error) => {
                setISDisaleBtn(false);
                console.log(error);
            });
    }

    function Selected(index: number) {
        setIsUpdate(true);
        setSelectedIndex(index);
    }

    function ChangeStudent(student: Student) {
        setStudent(student);
    }

    function AddListIndex(index: number) {
        const newList = [...listIndex];
        const newListStudentCodes = [...listStudentCodes];

        newList.push(index);
        newListStudentCodes.push(students[index].student_code);

        setListIndex(newList);
        setListStudentCodes(newListStudentCodes);
    }

    function RemoveListIndex(index: number) {
        const newList = [...listIndex];
        const newListCodes = [...listStudentCodes];

        const DeleteIndex = newList.findIndex((item) => item === index);
        const deleteIndex_1 = newListCodes.findIndex((studentCode) => studentCode === newListCodes[index]);

        if (DeleteIndex === -1 && deleteIndex_1 === -1) return;

        newList.splice(DeleteIndex, 1);
        newListCodes.splice(deleteIndex_1, 1);

        setListIndex(newList);
        setListStudentCodes(newListCodes);
    }

    function Search(value: string) {
        fetch(
            `https://localhost:7117/api/v1/student/get-students?searchValue=${value}&pageIndex=${
                pagination.pageIndex - 1
            }&pageSize=${pagination.pageSize}`,
            {
                method: 'get',
                headers: {
                    'Content-type': 'aplication/json',
                },
            },
        )
            .then(async (res) => {
                setSearchValue(value);

                let newStudents;
                if (res.status === 200 || res.status === 201) {
                    newStudents = await res.json();

                    setPagination({ ...pagination, totalPage: newStudents._totalPage });
                    setStudents(newStudents._paginationList);
                    return;
                }

                setPagination({ pageIndex: 1, pageSize: 10, totalPage: 0 });
                setStudents([]);
            })
            .catch((error) => console.log(error));
    }

    function fetchApi(page: number, pageSize: number) {
        fetch(`https://localhost:7117/api/v1/student/get-students?pageIndex=${page - 1}&pageSize=${pageSize}`, {
            method: 'get',
            headers: {
                'Content-type': 'aplication/json',
            },
        })
            .then(async (res) => {
                if (res.status !== 200) return;
                const studentDb = await res.json();
                setPagination({ ...pagination, pageIndex: page, totalPage: studentDb._totalPage });
                setStudents(studentDb._paginationList);
                setStudentsDefault(studentDb._paginationList);
            })
            .catch((error) => console.log(error));
    }

    function Sort(type: boolean, column: string) {
        fetch(
            `https://localhost:7117/api/v1/student/get-students?searchValue=${searchValue}&type=${type}&column=${column}&pageIndex=${
                pagination.pageIndex - 1
            }&pageSize=${pagination.pageSize}`,
            {
                method: 'get',
                headers: {
                    'Content-type': 'aplication/json',
                },
            },
        )
            .then(async (res) => {
                if (res.status !== 200) return;

                const studentDb = await res.json();
                setPagination({ ...pagination, totalPage: studentDb._totalPage });
                setStudents(studentDb._paginationList);
                setStudentsDefault(studentDb._paginationList);
            })
            .catch((error) => console.log(error));
    }

    return (
        <homePageContext.Provider value={{ isDisableBtn, setISDisaleBtn }}>
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
                                onSort={Sort}
                                onSelected={Selected}
                                onChecked={AddListIndex}
                                onUnChecked={RemoveListIndex}
                                DeleteItem={DeleteItem}
                            />

                            {pagination.totalPage !== 0 && (
                                <div className={cx('wrap_pagination')}>
                                    <Pagination
                                        count={pagination.totalPage}
                                        size="medium"
                                        page={pagination.pageIndex}
                                        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
                                            fetchApi(page, pagination.pageSize);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={cx('wrap_chang')}>
                            <WrapChange
                                isUpdate={isUpdate}
                                student={student}
                                faculty={fatultly}
                                listStudentCodes={listStudentCodes}
                                AddNewItem={AddNewItem}
                                UpdateItem={UpdateItem}
                                DeleteItem={DeleteMutipleItem}
                                ChangeStudent={ChangeStudent}
                            />
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </div>
        </homePageContext.Provider>
    );
}

export default HomePage;
