using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace bai_3.Models
{
    [Table("Factulty")]
    public class Factulty
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Factulty_id { get;set; }
        public string Factulty_code { get; set; } = null!;
        public string Factulty_name { get; set; } = null!;
    }
}
