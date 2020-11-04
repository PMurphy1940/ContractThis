using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Models
{
    public class ComponentMaterial
    {
        public int Id { get; set; }
        public int ProjectComponentId { get; set; }

        [Required]
        [MaxLength(25)]
        public string MaterialName { get; set; }
        public string Notes { get; set; }
        public int QuantityOnHand { get; set; }
        public int QuantityRequired { get; set; }
        public int QuantityUsed { get; set; }
        public double Cost { get; set; }
    }
}
