﻿using System.Security.Claims;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ContractThis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcontractorController : ControllerBase
    {
        private readonly ISubcontractorRepository _SubcontractorRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public SubcontractorController(ISubcontractorRepository subcontractorRepository, IUserProfileRepository userProfileRepository)
        {
            _SubcontractorRepository = subcontractorRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost]
        public IActionResult NewSubcontractor(SubContractor subContractor)
        {
            var currentUser = GetCurrentUserProfile();
            subContractor.UserProfileId = currentUser.Id;

            _SubcontractorRepository.AddSubcontractor(subContractor);
            return Ok(CreatedAtAction("Get", new { id = subContractor.Id }, subContractor));
        }

        [HttpGet]
        public IActionResult GetSubTypes()
        {
            var types = _SubcontractorRepository.GetSubContractorTypes();
            if ( types != null)
            {
                return Ok(types);   
            }
            return NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var subcontractor = _SubcontractorRepository.GetById(id);
            if ( subcontractor != null)
            {
                return Ok(subcontractor);
            }
            return NotFound();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}