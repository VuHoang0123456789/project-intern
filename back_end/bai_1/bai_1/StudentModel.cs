using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bai_1
{
    internal class StudentModel
    {
        public string studentId { get; set; }
        public string studentName { get; set; }
        public string birthDay { get; set; }
        public bool geneder { get; set; }
        public string fatulty { get; set; }

        public StudentModel(string studentId, string studentName, string birthDay, bool geneder, string fatulty)
        {
            this.studentId = studentId;
            this.studentName = studentName;
            this.birthDay = birthDay;
            this.geneder = geneder;
            this.fatulty = fatulty;
        }
    }
}
