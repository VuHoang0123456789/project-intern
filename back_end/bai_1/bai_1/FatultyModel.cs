using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bai_1
{
    internal class FatultyModel
    {
        public string fatultyId { get; set; }
        public string fatultyName { get; set; }

        public FatultyModel() { }
        public FatultyModel(string fatultyId, string fatultyName) {
            this.fatultyId = fatultyId;
            this.fatultyName = fatultyName;
        }
    }
}
