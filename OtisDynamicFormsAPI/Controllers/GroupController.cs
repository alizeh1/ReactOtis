using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsAPI.Services.Implementations;
using OtisDynamicFormsAPI.Services.Interfaces;
using OtisDynamicFormsModels;
using System.ComponentModel;
using System.Security.Principal;
using System.Text.RegularExpressions;
namespace OtisDynamicFormsAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IUsersServices _usersServices;
        private readonly IMapper _mapper;
        private readonly IGroupServices _groupServices;
        public readonly ApplicationDbContext dbContext;
        public GroupController(IGroupServices groupServices, ApplicationDbContext _dbContext, IMapper mapper, IUsersServices usersServices)
        {
            _mapper = mapper;
            _groupServices = groupServices;
            dbContext = _dbContext;
            _usersServices = usersServices;
        }
        [HttpGet]
        public ActionResult<List<GroupModel>> GetAllGroups()
        {
            var groupModels = _groupServices.GetAllGroups();
            return Ok(groupModels);
        }
        // GET api/group/{id}
        [HttpGet("{id}")]
        public IActionResult GetGroupById(int id)
        {
            var group = _groupServices.GetGroup(id);
            return Ok(group);
        }
        [HttpPost]
        public IActionResult CreateGroup(GroupViewModel group)
        {
            string Username = "abc";
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var groupview = _mapper.Map<GroupModel>(group);
            return Ok(_groupServices.CreateGroup(groupview));
        }
        // PUT api/group/{id}
        [HttpPut("groupId")]
        public IActionResult UpdateGroup(int groupId, GroupModel group)
        {
            string Username = "ABC";
            group.CreatedBy = Username;
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var Updategroup = _groupServices.UpdateGroup(groupId, group);
            return Ok(Updategroup);
        }
        [HttpDelete("groupId")]
        public IActionResult DeleteGroup(int groupId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var Deletegroup = _groupServices.DeleteGroup(groupId);
            return Ok(Deletegroup);
        }
        [HttpGet("{groupId}")]
        public IActionResult GetUsersInGroup(int groupId)
        {
            //var users = _usersServices.GetUsersInGroup(groupId);
            List<ApplicationUser> users = _usersServices.GetUsersInGroup(groupId);
            if (users == null)
            {
                return NotFound("This Group does not Exist!"); // Group not found
            }
            var userGroupViewModels = users.Select(u => new UserGroupViewModel
            {
                userId = u.Id,
                Name = u.FirstName + " " + u.LastName,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
            }).ToList();
            return Ok(userGroupViewModels);
        }
        [HttpPost("{groupId}")]
        public IActionResult AddUsersToGroup(int groupId, [FromBody] List<string> userIds)
        {
            var result = _usersServices.AddUsersToGroup(groupId, userIds);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result);
        }
        [HttpDelete("groupId/userId")]
        //[HttpDelete("{groupId}/users/{userId}")]
        public IActionResult DeleteUserFromGroup(int groupId, string userId)
        {
            var result = _usersServices.DeleteUserFromGroup(groupId, userId);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result);
        }
    }
}