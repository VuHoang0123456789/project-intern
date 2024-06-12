using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace bai_3.Models
{
    [Table("Student")]
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int? Student_id { get; set; }
        public string Student_code { get; set; } = null!;
        public string Student_name { get; set; } = null!;
        public DateTime Birth_day { get; set; }
        public string Geneder { get; set; } = null!;

        public int Factulty_id { get; set; }
    }
}
