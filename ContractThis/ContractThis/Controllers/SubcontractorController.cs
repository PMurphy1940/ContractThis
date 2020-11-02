using System.Collections.Generic;
using System.Security.Claims;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContractThis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcontractorController : ControllerBase
    {
        private readonly ISubcontractorRepository _subcontractorRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public SubcontractorController(ISubcontractorRepository subcontractorRepository, IUserProfileRepository userProfileRepository)
        {
            _subcontractorRepository = subcontractorRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost]
        public IActionResult NewSubcontractor(SubContractor subContractor)
        {
            var currentUser = GetCurrentUserProfile();
            subContractor.UserProfileId = currentUser.Id;

            _subcontractorRepository.AddSubcontractor(subContractor);
            return Ok(CreatedAtAction("Get", new { id = subContractor.Id }, subContractor));
        }
        [Authorize]
        [HttpGet("types/")]
        public IActionResult GetSubTypes()
        {
            var types = _subcontractorRepository.GetSubContractorTypes();
            if ( types != null)
            {
                return Ok(types);   
            }
            return NotFound();
        }

        [Authorize]
        [HttpGet("types/{id}")]
        public IActionResult GetAllOfType(int id)
        {
            var result = _subcontractorRepository.SearchByType(id);

            return result != null ? Ok(result) : (IActionResult)NotFound();
        }

        [Authorize]
        [HttpGet("find")]
        public IActionResult GetAllOfType(string q)
        {
            var result = _subcontractorRepository.SearchByMultipleTypes(q);

            return result != null ? Ok(result) : (IActionResult)NotFound();
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var subcontractor = _subcontractorRepository.GetById(id);
            return subcontractor != null ? Ok(subcontractor) : (IActionResult)NotFound();
        }

        [HttpGet("jobs/{id}")]
        public IActionResult GetSubcontractorJobs(int id)
        {
            var jobs = _subcontractorRepository.GetSubContractorJobs(id);
            return jobs != null ? Ok(jobs) : (IActionResult)NotFound();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}
