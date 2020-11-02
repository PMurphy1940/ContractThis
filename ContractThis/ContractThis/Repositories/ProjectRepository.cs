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


        //This method nests the list of components in the project
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
        //This method nests the list of components in the project
        public Project GetSingleProjectById(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select "
                                        + ProjectSqlCommandText + ", "
                                        + ProjectComponentSqlCommandText +
                                        @" FROM Project p
                                        LEFT JOIN ProjectComponent pc ON pc.ProjectId = p.Id
                                        WHERE p.Id = @Id";

                    DbUtilities.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Project aProject = null;

                    while (reader.Read())
                    {
                        if (aProject == null)
                        {
                            aProject = DbModelBuilder.BuildProjectModel(reader);
                        }

                        if (DbUtilities.IsNotDbNull(reader, "ProjectComponentId"))
                        {
                            aProject.Components.Add(DbModelBuilder.BuildProjectComponentModel(reader));
                        }
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

        public void UpdateProject(Project project)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Project
                                        SET ProjectName = @ProjectName,
                                            LocationName = @LocationName,
                                            LocationAddress = @LocationAddress,
                                            ProjectDescription = @ProjectDescription,
                                            Budget = @Budget,
                                            ImageLocation = @ImageLocation
                                        WHERE Id = @id
                                        ";
                    DbUtilities.AddParameter(cmd, "@ProjectName", project.ProjectName);
                    DbUtilities.AddParameter(cmd, "@LocationName", project.LocationName);
                    DbUtilities.AddParameter(cmd, "@LocationAddress", project.LocationAddress);
                    DbUtilities.AddParameter(cmd, "@ProjectDescription", project.ProjectDescription);
                    DbUtilities.AddParameter(cmd, "@Budget", project.Budget);
                    DbUtilities.AddParameter(cmd, "@ImageLocation", project.ImageLocation);
                    DbUtilities.AddParameter(cmd, "@id", project.Id);

                    cmd.ExecuteNonQuery();
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

        public void UpdateComponent(ProjectComponent component, int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE ProjectComponent 
                                        SET Name = @Name,
                                            ComponentDescription = @ComponentDescription,
                                            ProjectId = @ProjectId,
                                            MaterialCost = @MaterialCost
                                        WHERE Id = @id
                                        ";
                    DbUtilities.AddParameter(cmd, "@Name", component.ComponentName);
                    DbUtilities.AddParameter(cmd, "@ComponentDescription", component.ComponentDescription);
                    DbUtilities.AddParameter(cmd, "@ProjectId", component.ProjectId);
                    DbUtilities.AddParameter(cmd, "@MaterialCost", component.MaterialCost);
                    DbUtilities.AddParameter(cmd, "@id", component.Id);

                    cmd.ExecuteNonQuery();

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
                                        DELETE FROM ProjectComponent
                                        WHERE ProjectId = @Id
                        
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
                                        DELETE FROM ProjectComponentImages
                                        WHERE ProjectComponentId = @id

                                        DELETE FROM SubContractorBid
                                        WHERE ProjectComponentId = @id

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
