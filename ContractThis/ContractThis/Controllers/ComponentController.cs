using System.Security.Claims;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace ContractThis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : ControllerBase
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly ISubcontractorRepository _SubcontractorRepository;

        public ComponentController(IComponentRepository componentRepository, 
                                    IUserProfileRepository userProfileRepository, 
                                    IProjectRepository projectRepository, 
                                    ISubcontractorRepository subcontractorRepository)
        {
            _componentRepository = componentRepository;
            _userProfileRepository = userProfileRepository;
            _projectRepository = projectRepository;
            _SubcontractorRepository = subcontractorRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetAllProjectComponents(int id)
        {
            var components = _componentRepository.GetAllByProject(id);

            if (components != null)
            {
                return Ok(components);
            }
            return NotFound();
        }
        [HttpGet("single/{id}")]
        public IActionResult GetComponentById(int id)
        {
            var component = _componentRepository.GetComponentById(id);

            if(component != null)
            {
                return Ok(component);
            }
            return NotFound();
        }

        [HttpGet("images/{id}")]
        public IActionResult GetComponentImages(int id)
        {
            var images = _componentRepository.GetComponentImages(id);
            if (images != null)
            {
                return Ok(images);
            }
            return NotFound();
        }
        [HttpPost("images/")]
        public IActionResult AddComponentImage (ProjectComponentImages image)
        {
            //Ensure that the project for which the image is being submitted belongs to the current user
            //OR an authorized subcontractor
            var currentUser = GetCurrentUserProfile();
            var component = _componentRepository.GetComponentById(image.ProjectComponentId);
            var project = _projectRepository.GetSingleProjectById(component.ProjectId);

            if (currentUser.Id == project.UserProfileId || currentUser.Id == component.SubcontractorId)
            {
                _componentRepository.AddComponentImage(image);
                return Ok();
            }

            return Unauthorized();

        }

        [HttpPut("completed/{id}")]
        public IActionResult MarkComponentAsComplete(ProjectComponent component, int id)
        {
            //Ensure that the project for which the complete is being submitted belongs to the current user
            //OR an authorized subcontractor
            var currentUser = GetCurrentUserProfile();
            var project = _projectRepository.GetSingleProjectById(component.ProjectId);

            if (currentUser.Id == project.UserProfileId || currentUser.Id == component.SubcontractorId)
            {
                component.DateComplete =  DateAndTime.Now;
                _componentRepository.AddCompleteDateToComponent(component);
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
