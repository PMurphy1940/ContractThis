using System.Security.Claims;
using ContractThis.Models;
using ContractThis.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContractThis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _chatRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ChatController(IChatRepository chatRepository, IUserProfileRepository userProfileRepository)
        {
            _chatRepository = chatRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet("{id}")]
        public IActionResult GetChatByComponentId(int id)
        {
            var currentUser = GetCurrentUserProfile();

            //Verify that the POST request is coming from= the project owner
            if (currentUser.Id == id)
            {
                return Ok(_chatRepository.GetChat(id));
            }
            return Unauthorized();
        }
        [HttpPost("begin/")]
        public IActionResult BidRequest(SubContractorBid bid)
        {
            var currentUser = GetCurrentUserProfile();

            //Verify that the POST request is coming from= the project owner
            if (currentUser.Id == bid.UserProfileId)
            {
                _chatRepository.StartBid(bid);
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
