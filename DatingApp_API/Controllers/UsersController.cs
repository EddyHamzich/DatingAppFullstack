using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DatingApp_API.Data;
using DatingApp_API.DTOs;
using DatingApp_API.Models;
using DatingApp_API.Helpers;

namespace DatingApp_API.Controllers
{
    [Authorize] // all endpoints require auth
    [Route("api/v1/[controller]")] // [users]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet] // api/v1/users
        public async Task<IActionResult> GetUsers([FromQuery]GetUsersParams getUsersParams)
        {
            var currentUserID = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = await _repo.GetUser(currentUserID);
            getUsersParams.UserID = currentUserID;
            var users = await _repo.GetUsers(getUsersParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(
                users.CurrentPage,
                users.ItemsPerPage,
                users.TotalItems,
                users.TotalPages
            );

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")] // api/v1/users/{id}
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForListDto>(user);
            return Ok(userToReturn);
        }

        [HttpPost("{id}/like/{recipientID}")] // api/v1/users/{id}/like/{recipientID}
        public async Task<IActionResult> LikeUser(int id, int recipientID)
        {
            var like = await _repo.GetLike(id, recipientID);

            if(like != null)
                return BadRequest("You already liked this user.");
            if(await _repo.GetUser(recipientID) == null)
                return NotFound("User doesn't exist.");

            like = new Like { LikerID = id, LikeeID = recipientID };
            _repo.Add<Like>(like);

            if(await _repo.SaveAll())
                return Ok("Liked successfully.");
            else 
                return BadRequest("Failed to like user.");
        }

        [HttpDelete("{id}/like/{recipientID}")] // api/v1/users/{id}/like/{recipientID}
        public async Task<IActionResult> UnlikeUser(int id, int recipientID)
        {
            var like = await _repo.GetLike(id, recipientID);

            if(like == null)
                return BadRequest("You already unliked this user.");

            _repo.Delete<Like>(like);

            if(await _repo.SaveAll())
                return Ok("Unliked successfully.");
            else 
                return BadRequest("Failed to unlike user.");
        }
    }
}