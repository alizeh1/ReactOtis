using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsAPI.Services.Interfaces;
using OtisDynamicFormsModels;
using OtisDynamicFormsModels.Authentication.Login;
using OtisDynamicFormsModels.Authentication.SignUp;


namespace OtisDynamicFormsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationServices _AuthenticationServices;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        public AuthenticationController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IAuthenticationServices AuthenticationServices,
            IConfiguration configuration,
            RoleManager<IdentityRole> roleManager)
        {
            _AuthenticationServices = AuthenticationServices;
            _userManager = userManager;
            _configuration = configuration;
            _roleManager = roleManager;
        }
        [HttpPost("CreateSuperadmin")]
        public async Task<IActionResult> CreateSuperadmin([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _AuthenticationServices.CreateSuperadminUser(model.UserName, model.Email, model.Password);

            if (created)
            {
                return Ok("SuperAdmin Created!");
            }
            else
            {
                return BadRequest("Failed to create superadmin user.");
            }
        }
        // [Authorize(Roles = "Superadmin")]
        [HttpPost("CreateAdmins")]
        public async Task<IActionResult> CreateAdmins([FromBody] List<RegisterModel> admins)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCount = 0;
            foreach (var admin in admins)
            {
                var created = await _AuthenticationServices.CreateAdmin(admin);
                if (created)
                {
                    createdCount++;
                }
            }

            if (createdCount > 0)
            {
                return Ok($"{createdCount} admin(s) created!");
            }
            else
            {
                return BadRequest("Failed to create admin user(s).");
            }
        }


        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel registerUser)
        {

            if (!ModelState.IsValid) return BadRequest(registerUser);
            var result = await _AuthenticationServices.RegisterUser(registerUser);
            return Ok(result);

        }
        [HttpGet("userRole/{userName}")]
        public async Task<ActionResult<string>> GetUserRole(string userName)
        {
            var role = await _AuthenticationServices.GetUserRole(userName);
            if (role != null)
            {
                return Ok(role);
            }

            return NotFound("User does not Exist!");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid) return BadRequest(loginModel);
            var result = await _AuthenticationServices.Login(loginModel);
            if (result == null)
            {
                return NotFound("Invalid Credentials!");

            }

            return Ok(result);
        }


        
    }
}
