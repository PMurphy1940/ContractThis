using ContractThis.Models;
using ContractThis.Utilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ContractThis.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
               conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT "
                                            + UserProfileSqlCommandText +
                                      @"FROM UserProfile up
                                        WHERE up.FirebaseUserId = @FirebaseUserId
                                        ";
                    DbUtilities.AddParameter(cmd, "@FirebaseUserId", firebaseId);

                    var reader = cmd.ExecuteReader();
                    UserProfile aUser = null;
                    if (reader.Read())
                    {
                        aUser = DbModelBuilder.BuildUserProfileModel(reader);
                    }
                    reader.Close();
                    return aUser;
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select"
                                        + UserProfileSqlCommandText +
                                        @"FROM UserProfile up
                                        WHERE up.Id = @Id
                                        ";
                    DbUtilities.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    UserProfile aUser = null;
                    if (reader.Read())
                    {
                        aUser = DbModelBuilder.BuildUserProfileModel(reader);
                    }
                    reader.Close();
                    return aUser;
                }
            }
        }
        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile 
                                                (FirebaseUserId, FirstName, LastName, ScreenName, 
                                                 Email, ImageLocation, IsSubcontractor)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @ScreenName, 
                                                @Email, @ImageLocation, @IsSubcontractor)";

                    DbUtilities.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtilities.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtilities.AddParameter(cmd, "@ScreenName", userProfile.ScreenName);
                    DbUtilities.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtilities.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtilities.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtilities.AddParameter(cmd, "@IsSubcontractor", userProfile.IsSubcontractor);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE UserProfile
                                        SET 
                                            FirstName = @firstName,
                                            LastName = @lastName,
                                            ScreenName = @ScreenName,
                                            Email = @email,
                                            FirebaseUserId = @firebaseUserId,
                                            ImageLocation = @imageLocation,
                                            IsSubcontractor = @IsSubcontractor
                                    
                                        WHERE Id = @Id;";
                    DbUtilities.AddParameter(cmd, "@Id", userProfile.Id);
                    DbUtilities.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtilities.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtilities.AddParameter(cmd, "@ScreenName", userProfile.ScreenName);
                    DbUtilities.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtilities.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtilities.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtilities.AddParameter(cmd, "@IsSubcontractor", userProfile.IsSubcontractor);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
