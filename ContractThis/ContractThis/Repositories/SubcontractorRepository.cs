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
    }
}
