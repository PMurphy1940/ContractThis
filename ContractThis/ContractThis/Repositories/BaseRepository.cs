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
        /// Generate the Sql commant text to retrieve UserProfile (up) 
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
        /// up.IsSubcontractor <br/>
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
    }
}
