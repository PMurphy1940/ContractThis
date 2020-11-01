using ContractThis.Models;

namespace ContractThis.Repositories
{
    public interface IBidRepository
    {
        SubContractorBid GetBid(int id);
        void StartBid(SubContractorBid bid);
    }
}