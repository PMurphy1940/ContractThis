using ContractThis.Models;
using ContractThis.Utilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ContractThis.Repositories
{
    public class ChatRepository : BaseRepository, IChatRepository
    {
        public ChatRepository(IConfiguration configuration) : base(configuration) { }


        public SubContractorBid GetChat(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id AS BidId, ProjectComponentId, SubContractorId, UserProfileId, Fee, SubAccepted, OwnerComment
                                        FROM SubContractorBid
                                        WHERE ProjectComponentId = @Id
                                        ";
                    DbUtilities.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    SubContractorBid bid = null;

                    if (reader.Read())
                    {
                        bid = DbModelBuilder.BuildSubContractorBidModel(reader);
                    }

                    reader.Close();

                    return bid;
                }
            }
        }

        public void StartBid(SubContractorBid bid)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO SubContractorBid (ProjectComponentId, SubContractorId, UserProfileId, Fee, OwnerComment
                                        OUTPUT Inserted.Id
                                        Values ( @ProjectComponentId, @SubContractorId, @UserProfileId, @Fee, @OwnerComment)
                                        ";
                    DbUtilities.AddParameter(cmd, "@ProjectComponentId", bid.ProjectComponentId);
                    DbUtilities.AddParameter(cmd, "@SubContractorId", bid.SubContractorId);
                    DbUtilities.AddParameter(cmd, "@UserProfileId", bid.UserProfileId);
                    DbUtilities.AddParameter(cmd, "@Fee", bid.Fee);
                    DbUtilities.AddParameter(cmd, "@OwnerComment", bid.OwnerComment);

                    bid.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
