using ContractThis.Models;

namespace ContractThis.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseId(string firebaseId);
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
    }
}