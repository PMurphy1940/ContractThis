using System.Security.Claims;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace ContractThis.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IMaterialRepository _materialRepository;

        public MaterialController(IComponentRepository componentRepository,
                                    IUserProfileRepository userProfileRepository,
                                    IProjectRepository projectRepository,
                                    IMaterialRepository materialRepository)
        {
            _componentRepository = componentRepository;
            _userProfileRepository = userProfileRepository;
            _projectRepository = projectRepository;
            _materialRepository = materialRepository;
        }

        [HttpPost]
        public IActionResult PostMaterial (ComponentMaterial material)
        {
            //Ensure that the Post request is coming from the project owner
            var currentUser = GetCurrentUserProfile();
            int? subContractorId = null;
            var checkProject = _componentRepository.CheckComponentProjectForAuth(material.ProjectComponentId);
            if (checkProject.Components[0] != null)
            {
                subContractorId = checkProject.Components[0].SubcontractorId;
            }
            if (currentUser.Id == checkProject.UserProfileId || currentUser.Id == subContractorId)
            {
                _materialRepository.AddComponentMaterial(material);
                return Ok();
            }
            return Unauthorized();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }

    }
}
