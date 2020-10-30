using ContractThis.Models;
using ContractThis.Utilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Repositories
{
    public class ComponentRepository : BaseRepository, IComponentRepository
    {
        public ComponentRepository(IConfiguration configuration) : base(configuration) { }

        public List<ProjectComponent> GetAllByProject(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                          pci.ProjectComponentImageUrl, pci.Id AS PCImageId, "
                                        + ProjectComponentSqlCommandText +
                                        @" FROM ProjectComponent pc
                                        LEFT JOIN ProjectComponentImages pci ON pci.ProjectComponentId = pc.Id
                                        WHERE pc.ProjectId = @id";
                    DbUtilities.AddParameter(cmd, "@id", id);

                    var components = new List<ProjectComponent>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var componentId = DbUtilities.GetInt(reader, "ProjectComponentId");
                        var existingComponent = components.FirstOrDefault(p => p.Id == componentId);
                        if (existingComponent == null)
                        {
                            existingComponent = DbModelBuilder.BuildProjectComponentModel(reader);
                            existingComponent.ComponentImages = new List<ProjectComponentImages>();
                        }
                        if (DbUtilities.IsNotDbNull(reader, "PCImageId"))
                        {
                            existingComponent.ComponentImages.Add(DbModelBuilder.BuildComponentImageModel(reader));
                        }
                        components.Add(existingComponent);
                    }
                    reader.Close();
                    return components;
                }
            }
        }
        public ProjectComponent GetComponentById(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                          pci.ProjectComponentImageUrl, pci.Id AS PCImageId, "
                                        + ProjectComponentSqlCommandText +
                                        @" FROM ProjectComponent pc
                                        LEFT JOIN ProjectComponentImages pci ON pci.ProjectComponentId = pc.Id
                                        WHERE pc.Id = @id";
                    DbUtilities.AddParameter(cmd, "@id", id);

                    ProjectComponent component = null;
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {

                        if (component == null)
                        {
                            component = DbModelBuilder.BuildProjectComponentModel(reader);
                            component.ComponentImages = new List<ProjectComponentImages>();
                        }
                        if (DbUtilities.IsNotDbNull(reader, "PCImageId"))
                        {
                            component.ComponentImages.Add(DbModelBuilder.BuildComponentImageModel(reader));
                        }
                        
                    }
                    reader.Close();
                    return component;
                }
            }
        }

        public List<ProjectComponentImages> GetComponentImages(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, ProjectComponentId, ProjectComponentImageUrl
                                        FROM ProjectComponentImages
                                        WHERE ProjectComponentId = @id
                                        ";
                    DbUtilities.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var images = new List<ProjectComponentImages>();
                    while (reader.Read())
                    {
                        var anImage = new ProjectComponentImages()
                        {
                            Id = DbUtilities.GetInt(reader, "Id"),
                            ProjectComponentId = DbUtilities.GetInt(reader, "ProjectComponentId"),
                            ProjectComponentImageUrl = DbUtilities.GetString(reader, "ProjectComponentImageUrl")
                        };

                        images.Add(anImage);
                    }

                    reader.Close();

                    return images;
                }
            }
        }

        public void AddCompleteDateToComponent(ProjectComponent component)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE ProjectComponent 
                                        SET DateComplete = @DateComplete
                                        WHERE Id = @id
                                        ";
                    DbUtilities.AddParameter(cmd, "@DateComplete", component.DateComplete);
                    DbUtilities.AddParameter(cmd, "@id", component.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void AddComponentImage(ProjectComponentImages image)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO ProjectComponentImages ( ProjectComponentId, ProjectComponentImageUrl)
                                        OUTPUT Inserted.Id
                                        Values (@ProjectComponentId, @ProjectComponentImageUrl)
                                        ";
                    DbUtilities.AddParameter(cmd, "@ProjectComponentId", image.ProjectComponentId);
                    DbUtilities.AddParameter(cmd, "@ProjectComponentImageUrl", image.ProjectComponentImageUrl);

                    image.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
