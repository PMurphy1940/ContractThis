using ContractThis.Utilities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ContractThis.Repositories
{
    public abstract class BaseRepository
    {
        private readonly string _connectionString;

        public BaseRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        protected SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }

        //Sql command text presets

        /// <summary>
        /// Generate the Sql command text to retrieve UserProfile (up) 
        /// information keyed in a way to populate the reader build methods.
        /// </summary>
        /// <returns>
        /// up.Id AS UserID, <br/>
        /// up.FirstName, <br/>
        /// up.LastName, <br/>
        /// up.ScreenName, <br/>
        /// up.Email, <br/>
        /// up.FirebaseUserId, <br/>
        /// up.ImageLocation, <br/>
        /// up.IsSubcontractor
        /// </returns>
        protected static string UserProfileSqlCommandText => @"
                                                                up.Id AS UserID,
                                                                up.FirstName,
                                                                up.LastName,
                                                                up.ScreenName,
                                                                up.Email,
                                                                up.FirebaseUserId,
                                                                up.ImageLocation,
                                                                up.IsSubcontractor
                                                               ";


        /// <summary>
        /// Generate the Sql command text to retrieve a Project (p) 
        /// information keyed in a way to populate the reader build methods.
        /// </summary>
        /// <returns>
        /// p.Id AS ProjectId, <br/>
        /// p.UserProfileId, <br/>
        /// p.ProjectName, <br/>
        /// p.LocationName, <br/>
        /// p.LocationAddress, <br/>
        /// p.ProjectDescription, <br/>
        /// p.Budget, <br/>
        /// p.DateComplete, <br/>
        /// p.ImageLocation AS ProjectImage
        /// </returns>
        protected static string ProjectSqlCommandText => @"
                                                             p.Id AS ProjectId,
                                                             p.UserProfileId,
                                                             p.ProjectName,
                                                             p.LocationName,
                                                             p.LocationAddress,
                                                             p.ProjectDescription,
                                                             p.Budget,
                                                             p.DateComplete,
                                                             p.ImageLocation AS ProjectImage
                                                            ";


        /// <summary>
        /// Generate the Sql command text to retrieve a ProjectComponent (pc) 
        /// information keyed in a way to populate the reader build methods.
        /// </summary>
        /// <returns>
        /// pc.Id AS ProjectComponentId, <br/>
        /// pc.Name AS ProjectComponentName, <br/>
        /// pc.ComponentDescription, <br/>
        /// pc.ProjectId, <br/>
        /// pc.SubcontractorId, <br/>
        /// pc.DateComplete AS PCDateComplete, <br/>
        /// pc.MaterialCost, <br/>
        /// </returns>
        protected static string ProjectComponentSqlCommandText => @"
                                                             pc.Id AS ProjectComponentId,
                                                             pc.Name AS ProjectComponentName,
                                                             pc.ComponentDescription,
                                                             pc.ProjectId,
                                                             pc.SubcontractorId,
                                                             pc.DateComplete AS PCDateComplete,
                                                             pc.MaterialCost
                                                            ";
    }
}
