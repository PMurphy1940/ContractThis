using ContractThis.Models;
using ContractThis.Utilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Repositories
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        public List<Project> GetOwnerProjects(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select "
                                        + ProjectSqlCommandText + ", "
                                        + ProjectComponentSqlCommandText +
                                        @" FROM Project p
                                        LEFT JOIN ProjectComponent pc ON pc.ProjectId = p.Id
                                        WHERE UserProfileId = @Id";

                    DbUtilities.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var projects = new List<Project>();

                    while (reader.Read())
                    {
                        var projectId = DbUtilities.GetInt(reader, "ProjectId");
                        var existingProject = projects.FirstOrDefault(p => p.Id == projectId);
                        if (existingProject == null)
                        {
                            existingProject = DbModelBuilder.BuildProjectModel(reader);
                            projects.Add(existingProject);
                        }
                        if (DbUtilities.IsNotDbNull(reader, "ProjectComponentId"))
                        {
                            existingProject.Components.Add(DbModelBuilder.BuildProjectComponentModel(reader));
                        }
                    }

                    reader.Close();
                    return projects;
                }
            }
        }
        public ProjectComponent GetSingleComponent (int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT "
                                        + ProjectComponentSqlCommandText +
                                        @"FROM ProjectComponent pc
                                        WHERE pc.Id = @Id";
                    DbUtilities.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    
                    ProjectComponent component = null;
                    if (reader.Read())
                    {
                        component = DbModelBuilder.BuildProjectComponentModel(reader);
                    }

                    reader.Close();
                    return component;
                }
            }
        }

    }
}
