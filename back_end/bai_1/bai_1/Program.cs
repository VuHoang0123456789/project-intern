using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bai_1
{
    class Program
    {
        static List<StudentModel> AddNewStudent(List<StudentModel> students, StudentModel student)
        {
            students.Add(student);

            return students;
        }

        static List<StudentModel> UpdateStudent(List<StudentModel> students, StudentModel newStudent, string studentId)
        {
            int index = students.FindIndex(student => student.studentId == studentId);

            students[index] = newStudent;

            return students;
        }

        static List<StudentModel> DeleteStudent(List<StudentModel> students, string studentId)
        {

            var student = Search(students, studentId);

            if (student != null)
            {
                students.Remove(student);
            }
            else
            {
                Console.WriteLine("Khong ton tai sinh vien trong danh sach.");
            }

            return students;
        }


        static StudentModel? Search(List<StudentModel> students, string studentId)
        {
            var student = students.FirstOrDefault(student => student.studentId == studentId);

            if (student == null)
            {
                return null;
            }

            return student;
        }

        static void ShowStudent(List<StudentModel> students, List<FatultyModel> fatulties)
        {
            if (students.Count == 0)
            {
                Console.WriteLine("Khong co sinh vien nao trong danh sach");
            }
            else
            {
                foreach (var student in students)
                {
                    Console.WriteLine("MaSv: {0}, TenSv: {1}, Ngay sinh: {2}, Gioi tinh: {3}, Khoa: {4}.",
                        student.studentId, student.studentName,
                        student.birthDay, student.geneder ? "Nam" : "Nu",
                        fatulties.FirstOrDefault(fatulty => fatulty.fatultyId == student.fatulty).fatultyName);
                }
            }

        }

        static List<StudentModel> SearchStudent(List<StudentModel> students, string searchValue)
        {
            var newStudents = students.FindAll(student =>
            {
                return student.studentId == searchValue || student.studentName == searchValue || student.birthDay == searchValue;
            });

            return newStudents;
        }

        static void Main(string[] args)
        {
            string studentId, studentName, birthDay, fatulty, geneder;
            int chosse = 0;
            StudentModel newStudent;

            List<StudentModel> students = new();
            List<FatultyModel> fatulties = new();
            fatulties.Add(new FatultyModel("cntt", "Cong nghe thong tin"));
            fatulties.Add(new FatultyModel("dl", "Du lich"));
            fatulties.Add(new FatultyModel("nna", "Ngon ngu anh"));

            while (chosse < 5)
            {
                Console.WriteLine("Chon [1] de them moi sinh vien.");
                Console.WriteLine("Chon [2] de cap nhat thong tin sinh vien.");
                Console.WriteLine("Chon [3] de xoa thong tin sinh vien.");
                Console.WriteLine("Chon [4] de tim kiem sinh vien.");
                Console.WriteLine("Chon [5] de thoat chuong trinh.");

                Console.Write("Moi ban lua chon: ");
                chosse = int.Parse(Console.ReadLine());

                switch (chosse)
                {
                    case 1:
                        Console.Write("Nhap ma sinh vien: "); studentId = Console.ReadLine();
                        Console.Write("Nhap ten sinh vien: "); studentName = Console.ReadLine();
                        Console.Write("Nhap ngay sinh: "); birthDay = Console.ReadLine();
                        Console.Write("Nhap gioi tinh: "); geneder = Console.ReadLine();
                        Console.Write("Nhap khoa: "); fatulty = Console.ReadLine();

                        newStudent = new StudentModel(studentId, studentName, birthDay, bool.Parse(geneder), fatulty);
                        students = AddNewStudent(students, newStudent);

                        ShowStudent(students, fatulties);
                        Console.WriteLine("--------------------------------------------------------------------------------------------------------------");
                        break;
                    case 2:
                        Console.Write("Nhap ma sinh vien: "); studentId = Console.ReadLine();
                        Console.Write("Nhap ten sinh vien: "); studentName = Console.ReadLine();
                        Console.Write("Nhap ngay sinh: "); birthDay = Console.ReadLine();
                        Console.Write("Nhap gioi tinh: "); geneder = Console.ReadLine();
                        Console.Write("Nhap khoa: "); fatulty = Console.ReadLine();

                        newStudent = new(studentId, studentName, birthDay, bool.Parse(geneder), fatulty);

                        students = UpdateStudent(students, newStudent, studentId);
                        ShowStudent(students, fatulties);
                        Console.WriteLine("---------------------------------------------------------------------------------------------------------------");
                        break;
                    case 3: 
                        Console.Write("Nhap ma sinh vien can xoa: "); 
                        studentId = Console.ReadLine();

                        students = DeleteStudent(students, studentId);
                        ShowStudent(students, fatulties);
                        Console.WriteLine("---------------------------------------------------------------------------------------------------------------");
                        break;
                    case 4:
                        string searchValue;
                        Console.Write("Nhap tu khoa tim kiem: "); searchValue = Console.ReadLine();

                        List <StudentModel> newStudents = SearchStudent(students, searchValue);
                        ShowStudent(newStudents, fatulties);
                        Console.WriteLine("---------------------------------------------------------------------------------------------------------------"); 
                        break;
                }

            }

        }
    }
}
