using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Models
{
    public class Project
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }

        [Required]
        [MaxLength(25)]
        public string ProjectName { get; set; }

        [Required]
        [MaxLength(25)]
        public string LocationName { get; set; }

        [Required]
        [MaxLength(15)]
        public string LocationAddress { get; set; }

        [MaxLength(255)]
        public string ProjectDescription { get; set; }

        public double Budget { get; set; }
        public DateTime DateComplete { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }
        public List<ProjectComponent> Components { get; set; }
    }
}
