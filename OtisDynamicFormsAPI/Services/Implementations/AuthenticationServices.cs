using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsAPI.Services.Interfaces;
using OtisDynamicFormsModels;
using OtisDynamicFormsModels.Authentication.Login;
using OtisDynamicFormsModels.Authentication.SignUp;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OtisDynamicFormsAPI.Services.Implementations
{
    public class AuthenticationServices : IAuthenticationServices

    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;



        public AuthenticationServices(
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            RoleManager<IdentityRole> roleManager,
            SignInManager<ApplicationUser> signInManager)
        {

            _userManager = userManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }




        //Creating SuperAdmin Hardcoded
        public async Task<bool> CreateSuperadminUser(string userName, string email, string password)
        {
            var superadminUser = new ApplicationUser
            {
                UserName = userName,
                Email = email
            };

            var result = await _userManager.CreateAsync(superadminUser, password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(superadminUser, "Superadmin");
                return true;
            }
            else
            {
                return false;
            }
        }

        //SuperAdmin Creating Admins
        //public async Task<Status> CreateAdmins(RegisterDto admins)
        //{

        //        var status = new Status();
        //        var identityUser = new AppUser
        //        {
        //            UserName = admins.UserName,
        //            Email = admins.Email
        //        };

        //        var result = await _userManager.CreateAsync(identityUser, admins.Password);

        //        if (result.Succeeded)
        //        {
        //            await _userManager.AddToRoleAsync(identityUser, "Admin");
        //            status.StatusCode = StatusCodes.Status200OK;
        //            status.Message = "Admin Created Successfully";
        //        }
        //        else
        //        {
        //             status.StatusCode = StatusCodes.Status403Forbidden;
        //             status.Message = "User Creation Failed";
        //             return status;
        //        }


        //    return status;
        //}


        //SuperAdmin Creating Admins
        public async Task<bool> CreateAdmin(RegisterModel admin)
        {

            var user = new ApplicationUser
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = admin.Email,
                UserName = admin.UserName,
                EmailConfirmed = true,
                FirstName = admin.FirstName,
                LastName = admin.LastName,
                PhoneNumber = admin.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, admin.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
                return true;
            }

            return false;
        }


        //Admin Creating new User
        public async Task<Status> RegisterUser(RegisterModel registerUser)
        {

            var status = new Status();
            //check user existence
            var userExist = await _userManager.FindByNameAsync(registerUser.UserName);
            if (userExist != null)
            {
                status.StatusCode = StatusCodes.Status403Forbidden;
                status.Message = "User already exists";
                return status;
            }

            //Add User in Database

            ApplicationUser newuser = new ApplicationUser
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = registerUser.Email,
                UserName = registerUser.UserName,
                EmailConfirmed = true,
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                PhoneNumber = registerUser.PhoneNumber,
                PasswordHash = registerUser.Password

            };
           
            if (await _roleManager.RoleExistsAsync("User"))
            {
                var result = await _userManager.CreateAsync(newuser, registerUser.Password);
                if (!result.Succeeded)
                {
                    status.StatusCode = StatusCodes.Status403Forbidden;
                    status.Message = "User Creation Failed";
                    return status;
                }
                //Add role to user.
                await _userManager.AddToRoleAsync(newuser, "User");

                status.StatusCode = StatusCodes.Status200OK;
                status.Message = "User Created Successfully";
                return status;
            }
            else
            {
                status.StatusCode = StatusCodes.Status500InternalServerError;
                status.Message = "This Role Does not Exist";
                return status;
            }


        }
        // Login 
        //public async Task<Token> Login(LoginModel loginModel)
        //{//check user Existence 
        //    var user = await _userManager.FindByNameAsync(loginModel.UserName);

        //    if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
        //    {
        //        var authClaims = new List<Claim>
        //        {
        //            new Claim(ClaimTypes.Name, user.UserName),
        //            new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),

        //        };
        //        var userRoles = await _userManager.GetRolesAsync(user);
        //        foreach (var roles in userRoles)
        //        {
        //            authClaims.Add(new Claim(ClaimTypes.Role, loginModel.Role));
        //        }


        //        return  new Token {Tokens = new JwtSecurityTokenHandler().WriteToken(GetToken(authClaims)) };

        //    }
        //    return null;

        //}
        public async Task<Token> Login(LoginModel loginModel)
        {
            // Check user existence
            //var user = loginModel.UserName;
            var user = await _userManager.FindByNameAsync(loginModel.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var userRoles = await _userManager.GetRolesAsync(user);

                if (userRoles.Contains(loginModel.Role))
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, loginModel.Role));

                    var token = GetToken(authClaims);

                    return new Token
                    {
                        Tokens = new JwtSecurityTokenHandler().WriteToken(token),
                        //Roles = userRoles
                    };
                }
            }

            return null;
        }


        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["JWT:ValidIssuer"],
                _configuration["JWT:ValidAudience"],
                claims: authClaims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signIn);
            return token;
        }

        public async Task<string> GetUserRole(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user != null)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (roles != null && roles.Any())
                {
                    return roles.First(); // Assuming the user has only one role
                }
            }

            return null;
        }

       
    }
}
