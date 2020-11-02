using ContractThis.Models;
using System.Collections.Generic;

namespace ContractThis.Repositories
{
    public interface IBidRepository
    {
        void AcceptBid(SubContractorBid bid);
        SubContractorBid GetBidByComponent(int id);
        List<SubContractorBid> GetBidBySubcontractor(int id);
        void StartBid(SubContractorBid bid);
    }
}