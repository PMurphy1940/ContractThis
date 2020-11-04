using ContractThis.Models;
using ContractThis.Utilities;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Repositories
{
    public class SubcontractorRepository : BaseRepository, ISubcontractorRepository
    {
        public SubcontractorRepository(IConfiguration configuration) : base(configuration) { }

        public void AddSubcontractor(SubContractor subContractor)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Subcontractor 
                                            ( UserProfileId, SubContractorBusinessName, SubContractorImageUrl )
                                        OUTPUT Inserted.Id
                                            Values ( @UserProfileId, @SubContractorBusinessName, @SubContractorImageUrl )
                                        ";
                    DbUtilities.AddParameter(cmd, "@UserProfileId", subContractor.UserProfileId);
                    DbUtilities.AddParameter(cmd, "@SubContractorBusinessName", subContractor.SubcontractorBusinessName);
                    DbUtilities.AddParameter(cmd, "@SubContractorImageUrl", subContractor.SubContractorImageLocation);

                    subContractor.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public SubContractor GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id as SubId, 
                                                UserProfileId, 
                                                SubContractorBusinessName, 
                                                SubContractorImageUrl
                                        FROM SubContractor
                                        WHERE Id = @id
                                        ";
                    DbUtilities.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    SubContractor subContractor = null;

                    if (reader.Read())
                    {
                        subContractor = DbModelBuilder.BuildSubContractorModel(reader);
                    }

                    reader.Close();

                    return subContractor;
                }
            }
        }

        public List<SubContractorType> GetSubContractorTypes()
        {
            using ( var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, Specialty
                                        FROM SubContractorType
                                        ";

                    var reader = cmd.ExecuteReader();

                    var subtypes = new List<SubContractorType>();
                    while (reader.Read())
                    {
                        var type = new SubContractorType()
                        {
                            Id = DbUtilities.GetInt(reader, "Id"),
                            Specialty = DbUtilities.GetString(reader, "Specialty")
                        };

                        subtypes.Add(type);
                    }

                    reader.Close();

                    return subtypes;
                }
            }
        }

        public List<SubContractor> SearchByType(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT sc.Id AS SubId, sc.SubContractorBusinessName, sc.SubContractorImageUrl
                                        FROM SubContractor sc
                                        LEFT JOIN SubContractorJobType jt ON jt.SubContractorId = sc.Id
                                        LEFT JOIN SubContractorType st ON jt.SubContractorTypeId = st.Id
                                        WHERE st.Id = @id
                                        ";
                    DbUtilities.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var subsOfType = new List<SubContractor>();

                    while (reader.Read())
                    {
                        var sub = new SubContractor()
                        {
                            Id = DbUtilities.GetInt(reader, "SubId"),
                            SubcontractorBusinessName = DbUtilities.GetString(reader, "SubContractorBusinessName"),
                            SubContractorImageLocation = DbUtilities.GetString(reader, "SubContractorImageUrl")
                        };
                        subsOfType.Add(sub);
                    }
                    reader.Close();

                    return subsOfType;
 
                }
            }
        }

        public List<SubContractor> SearchByMultipleTypes(string find)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    //Make an iterable list of the the requestList string 
                    string[] searchParams = find.Split(",");
                    //Build the text of type @ parameters for the Sql 'IN' list using the iterable searchParams string
                    string findlist = "";
                    for (int i = 0; i < searchParams.Length; i++)
                    {
                        int aSearch;
                        //Catch any attempt to pass in a non-int
                        try
                        {
                            int.TryParse(searchParams[i], out aSearch);
                        }
                        catch
                        {
                            return null;
                        }
                        //Add the Sql '@' to the 'In' chain for this index of the parameter string 
                        string findType = "@findType" + i;
                        findlist += findType;
                        //Add a comma between the statement if its not the last one in the list
                        if (i != searchParams.Length - 1)
                        {
                            findlist += ", ";
                        }

                        //Tie this Id value to the command text as it is being built
                        DbUtilities.AddParameter(cmd, findType, aSearch);
                    }

                    cmd.CommandText = @"
                                        SELECT sc.Id AS SubId, sc.SubContractorBusinessName, sc.SubContractorImageUrl, sc.BusinessStatement
                                        FROM SubContractor sc
                                        LEFT JOIN SubContractorJobType jt ON jt.SubContractorId = sc.Id
                                        LEFT JOIN SubContractorType st ON jt.SubContractorTypeId = st.Id
                                        WHERE st.Id IN ( "
                                           + findlist + " )";
                                        


                    var reader = cmd.ExecuteReader();
                    var subsOfType = new List<SubContractor>();

                    while (reader.Read())
                    {
                        var sub = new SubContractor()
                        {
                            Id = DbUtilities.GetInt(reader, "SubId"),
                            SubcontractorBusinessName = DbUtilities.GetString(reader, "SubContractorBusinessName"),
                            BusinessStatement = DbUtilities.GetString(reader, "BusinessStatement"),
                            SubContractorImageLocation = DbUtilities.GetString(reader, "SubContractorImageUrl")
                        };
                        subsOfType.Add(sub);
                    }
                    reader.Close();

                    return subsOfType;

                }
            }
        }

        public List<SubContractorJob> GetSubContractorJobs(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                          pci.ProjectComponentImageUrl, pci.Id AS PCImageId, p.LocationName, p.LocationAddress,
                                          p.ProjectName, up.ScreenName, up.ImageLocation, scb.Fee, "
                                        + ProjectComponentSqlCommandText +
                                        @" FROM ProjectComponent pc
                                        LEFT JOIN ProjectComponentImages pci ON pci.ProjectComponentId = pc.Id
                                        LEFT JOIN Project p ON p.Id = pc.ProjectId
                                        LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                        LEFT JOIN SubContractorBid scb on scb.ProjectComponentId = pc.Id
                                        WHERE pc.SubContractorId = @id AND scb.SubContractorId = @id";
                    DbUtilities.AddParameter(cmd, "@id", id);

                    var jobs = new List<SubContractorJob>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var componentId = DbUtilities.GetInt(reader, "ProjectComponentId");
                        var existingJob = jobs.FirstOrDefault(j => j.Id == componentId);
                        if (existingJob == null)
                        {
                            existingJob = DbModelBuilder.BuildSubcontractorJobModel(reader);
                            existingJob.ComponentImages = new List<ProjectComponentImages>();
                            jobs.Add(existingJob);
                        }
                        if (DbUtilities.IsNotDbNull(reader, "PCImageId"))
                        {
                            existingJob.ComponentImages.Add(DbModelBuilder.BuildComponentImageModel(reader));
                        }
                        
                    }
                    reader.Close();
                    return jobs;
                }
            }
        }
    }
}
