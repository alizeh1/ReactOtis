using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsAPI.Services.Implementations;
using OtisDynamicFormsAPI.Services.Interfaces;
using OtisDynamicFormsModels;
using OtisDynamicFormsModels.Authentication.SignUp;

namespace OtisDynamicFormsAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAuthenticationServices _AuthenticationServices;
        private readonly IMapper _mapper;
        private readonly IUsersServices _userServices;
        public readonly ApplicationDbContext dbContext;

        public UsersController(IUsersServices userServices, ApplicationDbContext _dbContext, IMapper mapper, IAuthenticationServices AuthenticationServices)
        {
            _AuthenticationServices = AuthenticationServices;
            _mapper = mapper;
            _userServices = userServices;
            dbContext = _dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserById(string userid)
        {
            var user = await _userServices.GetUserById(userid);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    
        // GET api/users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var user = await _userServices.GetAllUsers();
            return Ok(user);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(RegisterModel user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(await _AuthenticationServices.RegisterUser(user));
        }
        // PUT api/user/{id}
        [HttpPut("userid")]
        public async Task<IActionResult> Updateuser(string userid, RegisterDto updatedUser)
         {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var updateuser = _mapper.Map<ApplicationUser>(updatedUser);
            return Ok(await _userServices.UpdateUser(userid,updateuser));

        }
        [HttpDelete("userid")]
        public IActionResult DeleteUser(string userid)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var DeleteUser = _userServices.DeleteUser(userid);
            return Ok(DeleteUser);

        }
    }
}
