using ContractThis.Models;
using System.Collections.Generic;

namespace ContractThis.Repositories
{
    public interface IProjectRepository
    {
        void AddComponent(ProjectComponent component);
        void AddProject(Project project);
        void DeleteComponent(int id);
        void DeleteProject(int id);
        List<Project> GetOwnerProjects(int id);
        ProjectComponent GetSingleComponent(int id);
        Project GetSingleProjectById(int id);
    }
}