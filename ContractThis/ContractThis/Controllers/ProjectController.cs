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

        [HttpGet("{id}")]
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

        [HttpGet("component/{id}")]
        public IActionResult GetComponent(int id)
        {
            var projects = _projectRepository.GetSingleComponent(id);
            return projects == null ? NotFound() : (IActionResult)Ok(projects);
        }

        private UserProfile GetCurrentUserProfile()
        {
            if (ClaimsPrincipal.Current == null)
            {
                return null;
            }
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
