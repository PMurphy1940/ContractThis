﻿using ContractThis.Models;
using System.Collections.Generic;

namespace ContractThis.Repositories
{
    public interface IComponentRepository
    {
        void AddCompleteDateToComponent(ProjectComponent component);
        void AddComponentImage(ProjectComponentImages image);
        Project CheckComponentProjectForDeleteAuth(int id);
        List<ProjectComponent> GetAllByProject(int id);
        ProjectComponent GetComponentById(int id);
        List<ProjectComponentImages> GetComponentImages(int id);
    }
}