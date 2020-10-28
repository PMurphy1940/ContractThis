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
                                        SELECT Id, Speciality
                                        FROM SubContractorType
                                        ";

                    var reader = cmd.ExecuteReader();

                    List<SubContractorType> subtypes = null;
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
    }
}
