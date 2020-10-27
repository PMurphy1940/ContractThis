using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContractThis.Controllers
{
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

        [HttpGet("byowner/{id}")]
        public IActionResult GetUserProjects(int id)
        {
            //Verify that the GET request is coming from this {id} active user
            //      !!Off for development!!     //
/*           var activeUser = GetCurrentUserProfile();
            if (activeUser == null || activeUser.Id != id)
            {
                return Unauthorized();
            }*/
            var projects = _projectRepository.GetOwnerProjects(id);
            return projects == null ? NotFound() : (IActionResult)Ok(projects);
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

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            _projectRepository.DeleteProject(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
