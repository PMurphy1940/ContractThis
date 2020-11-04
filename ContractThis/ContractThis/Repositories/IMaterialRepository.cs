using ContractThis.Models;

namespace ContractThis.Repositories
{
    public interface IMaterialRepository
    {
        void AddComponentMaterial(ComponentMaterial material);
    }
}