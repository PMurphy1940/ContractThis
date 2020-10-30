using ContractThis.Models;

namespace ContractThis.Repositories
{
    public interface IChatRepository
    {
        SubContractorBid GetChat(int id);
        void StartBid(SubContractorBid bid);
    }
}