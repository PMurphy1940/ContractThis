using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Models
{
    public class ProjectComponent
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }

        [Required]
        [MaxLength(25)]
        public string ComponentName { get; set; }
        public string ComponentDescription { get; set; }
        public int SubcontractorId { get; set; }
        public DateTime DateComplete { get; set; }
        public double MaterialCost { get; set; }
        public List<ProjectComponentImages> ComponentImages { get; set; }
    }
}
