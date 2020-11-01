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
    public class BidController : ControllerBase
    {
        private readonly IBidRepository _bidRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public BidController(IBidRepository bidRepository, IUserProfileRepository userProfileRepository)
        {
            _bidRepository = bidRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet("{id}")]
        public IActionResult GetBidByComponentId(int id)
        {
            var chat = _bidRepository.GetBid(id);
            if (chat != null)
            {
                return Ok(chat);
            }
            return NotFound();

        }
        [HttpPost]
        public IActionResult BidRequest(SubContractorBid bid)
        {
            var currentUser = GetCurrentUserProfile();

            //Verify that the POST request is coming from= the project owner
            if (currentUser.Id == bid.UserProfileId)
            {
                _bidRepository.StartBid(bid);
                return Ok(CreatedAtAction("Get", new { id = bid.Id }, bid));
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
