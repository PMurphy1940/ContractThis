using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Models
{
    public class SubContractor
    {
        public int Id { get; set; }
        public int UserProfileId {get; set; }
        public string SubcontractorBusinessName { get; set; }
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string SubContractorImageLocation { get; set; }
        public string BusinessStatement { get; set; }
        public List<SubContractorType> SubContractorSpecialties { get; set; }
        public List<ProjectComponent> SubContractorComponents { get; set; }
    }
}
