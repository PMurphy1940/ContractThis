using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ContractThis.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ProjectController(IProjectRepository projectRepository, IUserProfileRepository userProfileRepository)
        {
            _projectRepository = projectRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("byowner")]
        public IActionResult GetUserProjects()
        {
          var activeUser = GetCurrentUserProfile();
            if (activeUser != null)
            {
                var projects = _projectRepository.GetOwnerProjects(activeUser.Id);
                return Ok(projects);
            }

            return Unauthorized();
            
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var singleProject = _projectRepository.GetSingleProjectById(id);
            return singleProject == null ? NotFound() : (IActionResult)Ok(singleProject);
        }

        [HttpGet("component/{id}")]
        public IActionResult GetComponent(int id)
        {
            var projectComponent = _projectRepository.GetSingleComponent(id);
            return projectComponent == null ? NotFound() : (IActionResult)Ok(projectComponent);
        }

        [HttpPost]
        public IActionResult Post(Project project)
        {
            var currentUser = GetCurrentUserProfile();
            project.UserProfileId = currentUser.Id;

            _projectRepository.AddProject(project);
            return Ok(CreatedAtAction("Get", new { id = project.Id }, project));
        }

        [HttpPut("{id}")]
        public IActionResult PutProject(Project project, int id)
        {
            var currentUser = GetCurrentUserProfile();

            //Verify that the PUT request is coming from either the project owner or the authorized Subcontractor
            if (currentUser.Id == project.UserProfileId && project.Id == id)
            {
                _projectRepository.UpdateProject(project);
                return Ok(CreatedAtAction("Get", new { id = project.Id }, project));
            }

            return Unauthorized();
        }

        [HttpPost("component/")]
        public IActionResult PostComponent(ProjectComponent component)
        {
            var currentUser = GetCurrentUserProfile();
            var project = _projectRepository.GetSingleProjectById(component.ProjectId);

            //Verify that the POST request is coming from either the project owner or the authorized Subcontractor
            if(currentUser.Id == project.UserProfileId || currentUser.Id == component.SubcontractorId )
            {
                _projectRepository.AddComponent(component);
                return Ok(CreatedAtAction("Get", new { id = component.Id }, component));
            }

                return Unauthorized();
        }

        [HttpPut("component/{id}")]
        public IActionResult PutComponent(ProjectComponent component, int id)
        {
            var currentUser = GetCurrentUserProfile();
            var project = _projectRepository.GetSingleProjectById(component.ProjectId);

            //Verify that the PUT request is coming from either the project owner or the authorized Subcontractor
            if (currentUser.Id == project.UserProfileId || currentUser.Id == component.SubcontractorId && component.ProjectId == id)
            {
                _projectRepository.UpdateComponent(component, id);
                return Ok(CreatedAtAction("Get", new { id = component.Id }, component));
            }

            return Unauthorized();
        }


        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {

            _projectRepository.DeleteProject(id);
            return NoContent();
        }

        [HttpDelete("component/{id}")]

        public IActionResult DeleteComponent(int id)
        {
            _projectRepository.DeleteComponent(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
