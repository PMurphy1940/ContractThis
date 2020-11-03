using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContractThis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {       
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
            
        }
        [Authorize]
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseId(firebaseUserId));
        }
        [Authorize]
        [HttpGet("details/{id}")]
        public IActionResult GetById(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            var verifiedCurrentUserProfile = GetCurrentUserProfile();

            if (id != userProfile.Id || verifiedCurrentUserProfile.Id != userProfile.Id)
            {
                return BadRequest();
            }
            _userProfileRepository.Update(userProfile);
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
