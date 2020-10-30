using ContractThis.Models;
using System.Collections.Generic;

namespace ContractThis.Repositories
{
    public interface ISubcontractorRepository
    {
        void AddSubcontractor(SubContractor subContractor);
        SubContractor GetById(int id);
        List<SubContractorType> GetSubContractorTypes();
        List<SubContractor> SearchByMultipleTypes(string requestList);
        List<SubContractor> SearchByType(int id);
    }
}