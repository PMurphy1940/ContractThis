using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Models
{
    public class SubContractorJob : ProjectComponent
    {
        public string OwnerScreenName { get; set; }
        public string OwnerImageUrl { get; set; }
        public string ProjectName { get; set; }
        public string LocationName { get; set; }
        public string LocationAddress { get; set; }
        public double SubcontractorFee { get; set; }

    }
}
