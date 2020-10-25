using ContractThis.Models;
using System.Collections.Generic;

namespace ContractThis.Repositories
{
    public interface IProjectRepository
    {
        List<Project> GetOwnerProjects(int id);
        ProjectComponent GetSingleComponent(int id);
    }
}