using Microsoft.AspNetCore.Mvc;
using OtisDynamicFormsModels;
using OtisDynamicFormsModels.Authentication.Login;
using OtisDynamicFormsModels.Authentication.SignUp;

namespace OtisDynamicFormsAPI.Services.Interfaces
{
    public interface IAuthenticationServices
    {
        Task<Status> RegisterUser([FromBody] RegisterModel registerUser);

        Task<Token> Login(LoginModel loginModel);

        Task<string> GetUserRole(string userName);
        Task<bool> CreateSuperadminUser(string userName, string email, string password);
        Task<bool> CreateAdmin(RegisterModel admin);
      

    }
}
