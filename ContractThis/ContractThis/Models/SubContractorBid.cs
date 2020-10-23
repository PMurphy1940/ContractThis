using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Models
{
    public class SubContractorBid
    {
        public int Id { get; set; }
        public int ProjectComponentId { get; set; }
        public int SubContractorId { get; set; }
        public int UserProfileId { get; set; }
        public double Fee { get; set; }
        public DateTime SubAccepted { get; set; }
        public string OwnerComment { get; set; }
    }
}
