using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Models
{
    public class ProjectComponentImages
    {
        public int Id { get; set; }
        public int ProjectComponentId { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }
    }
}
