using ContractThis.Models;
using ContractThis.Utilities;
using Microsoft.Extensions.Configuration;

namespace ContractThis.Repositories
{
    public class MaterialRepository : BaseRepository, IMaterialRepository
    {
        public MaterialRepository(IConfiguration configuration) : base(configuration) { }

        public void AddComponentMaterial(ComponentMaterial material)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO ComponentMaterial (ProjectComponentId, MaterialName, Cost, QuantityOnHand, QuantityRequired, Notes)
                                        OUTPUT Inserted.Id
                                        Values (@ProjectComponentId, @MaterialName, @Cost, @QuantityOnHand, @QuantityRequired, @Notes)
                                        ";
                    DbUtilities.AddParameter(cmd, "@ProjectComponentId", material.ProjectComponentId);
                    DbUtilities.AddParameter(cmd, "@MaterialName", material.MaterialName);
                    DbUtilities.AddParameter(cmd, "@Cost", material.Cost);
                    DbUtilities.AddParameter(cmd, "@QuantityOnHand", material.QuantityOnHand);
                    DbUtilities.AddParameter(cmd, "@QuantityRequired", material.QuantityRequired);
                    DbUtilities.AddParameter(cmd, "@Notes", material.Notes);

                    material.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
