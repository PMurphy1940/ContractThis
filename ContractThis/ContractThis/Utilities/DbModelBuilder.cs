using ContractThis.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContractThis.Utilities
{
    public class DbModelBuilder
    {
        /// <summary>
        /// Builds an instance of a User Profile from a Sql Data Reader object
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Instance of <strong>UserProfile</strong></returns>
        public static UserProfile BuildUserProfileModel(SqlDataReader reader)
        {
            var user = new UserProfile()
            {
                Id = DbUtilities.GetInt(reader, "UserId"),
                FirstName = DbUtilities.GetString(reader, "FirstName"),
                LastName = DbUtilities.GetString(reader, "LastName"),
                ScreenName = DbUtilities.GetString(reader, "ScreenName"),
                Email = DbUtilities.GetString(reader, "Email"),                
                ImageLocation = DbUtilities.GetString(reader, "FirebaseUserId"),
                IsSubcontractor = DbUtilities.GetInt(reader, "FirebaseUserId")
            };

            return user;
        }


        /// <summary>
        /// Builds an instance of a Project from a Sql Data Reader object
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Instance of a <strong>Project</strong></returns>
        public static Project BuildProjectModel(SqlDataReader reader)
        {
            var project = new Project()
            {
                Id = DbUtilities.GetInt(reader, "UserId"),
                UserProfileId = DbUtilities.GetInt(reader, "UserProfileId"),
                ProjectName = DbUtilities.GetString(reader, "ProjectName"),
                LocationName = DbUtilities.GetString(reader, "LocationName"),
                LocationAddress = DbUtilities.GetString(reader, "LocationAddress"),
                ProjectDescription = DbUtilities.GetString(reader, "ProjectDescription"),
                Budget = DbUtilities.GetInt(reader, "Budget"),
                DateComplete = DbUtilities.GetNullableDateTime(reader, "DateComplete"),
                ImageLocation = DbUtilities.GetString(reader, "ImageLocation")
            };

            return project;
        }


        /// <summary>
        /// Builds an instance of a ProjectComponent from a Sql Data Reader object
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Instance of a <strong>ProjectComponent</strong></returns>
        public static ProjectComponent BuildProjectComponentModel(SqlDataReader reader)
        {
            var projectcomponent = new ProjectComponent()
            {
                Id = DbUtilities.GetInt(reader, "UserId"),
                ProjectId = DbUtilities.GetInt(reader, "ProjectId"),
                ComponentName = DbUtilities.GetString(reader, "ComponentName"),
                ComponentDescription = DbUtilities.GetString(reader, "ComponentDescription"),
                SubcontractorId = DbUtilities.GetInt(reader, "SubcontractorId"),
                DateComplete = DbUtilities.GetNullableDateTime(reader, "ComponentDateComplete"),
                MaterialCost = DbUtilities.GetInt(reader, "MaterialCost"),
                
            };

            return projectcomponent;
        }


        /// <summary>
        /// Builds an instance of a SubContractor from a Sql Data Reader object
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Instance of a <strong>SubContractor</strong></returns>
        public static SubContractor BuildSubContractorModel(SqlDataReader reader)
        {
            var subcontractor = new SubContractor()
            {
                Id = DbUtilities.GetInt(reader, "UserId"),
                UserProfileId = DbUtilities.GetInt(reader, "UserProfileId"),
                SubcontractorBusineesName = DbUtilities.GetString(reader, "SubcontractorBusineesName"),
                SubContractorImageLocation = DbUtilities.GetString(reader, "SubContractorImageLocation"),
            };

            return subcontractor;
        }

        /// <summary>
        /// Builds an instance of a SubContractor from a Sql Data Reader object
        /// </summary>
        /// <param name="reader"></param>
        /// <returns>Instance of a <strong>SubContractor</strong></returns>
        public static SubContractorBid BuildSubContractorBidModel(SqlDataReader reader)
        {
            var subContractorBid = new SubContractorBid()
            {
                Id = DbUtilities.GetInt(reader, "UserId"),
                ProjectComponentId = DbUtilities.GetInt(reader, "ProjectComponentId"),
                SubContractorId = DbUtilities.GetInt(reader, "SubContractorId"),
                UserProfileId = DbUtilities.GetInt(reader, "UserProfileId"),
                Fee = DbUtilities.GetInt(reader, "Fee"),
                SubAccepted = DbUtilities.GetNullableDateTime(reader, "SubAccepted"),
                OwnerComment = DbUtilities.GetString(reader, "OwnerComment")
            };

            return subContractorBid;
        }
    }
}
