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

        public Project GetSingleProjectById(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT "
                                           + ProjectSqlCommandText +
                                     @"FROM Project p
                                       WHERE p.Id = @id";
                    DbUtilities.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Project aProject = null;
                    if (reader.Read())
                    {
                        aProject = DbModelBuilder.BuildProjectModel(reader);
                    }

                    reader.Close();
                    return aProject;
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
        public void AddProject(Project project)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Project (UserProfileId, 
                                                                ProjectName, 
                                                                LocationName, 
                                                                LocationAddress, 
                                                                ProjectDescription,
                                                                Budget,
                                                                ImageLocation)
                                        OUTPUT Inserted.Id
                                        Values (@UserProfileId, @ProjectName, @LocationName, @LocationAddress, @ProjectDescription, @Budget, @ImageLocation)
                                        ";
                    DbUtilities.AddParameter(cmd, "@UserProfileId", project.UserProfileId);
                    DbUtilities.AddParameter(cmd, "@ProjectName", project.ProjectName);
                    DbUtilities.AddParameter(cmd, "@LocationName", project.LocationName);
                    DbUtilities.AddParameter(cmd, "@LocationAddress", project.LocationAddress);
                    DbUtilities.AddParameter(cmd, "@ProjectDescription", project.ProjectDescription);
                    DbUtilities.AddParameter(cmd, "@Budget", project.Budget);
                    DbUtilities.AddParameter(cmd, "@ImageLocation", project.ImageLocation);

                    project.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void AddComponent(ProjectComponent component)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO ProjectComponent (Name, 
                                                                        ComponentDescription, 
                                                                        ProjectId, 
                                                                        MaterialCost)    
                                        OUTPUT Inserted.Id
                                        Values (@Name, @ComponentDescription, @ProjectId, @MaterialCost)
                                        ";
                    DbUtilities.AddParameter(cmd, "@Name", component.ComponentName);
                    DbUtilities.AddParameter(cmd, "@ComponentDescription", component.ComponentDescription);
                    DbUtilities.AddParameter(cmd, "@ProjectId", component.ProjectId);
                    DbUtilities.AddParameter(cmd, "@MaterialCost", component.MaterialCost);

                    component.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteProject(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Project
                                        WHERE Id = @Id
                                        ";
                    DbUtilities.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteComponent(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM ProjectComponent
                                        WHERE Id = @Id
                                        ";
                    DbUtilities.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
