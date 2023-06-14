using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsModels;
using OtisDynamicFormsModels.Authentication.SignUp;
using OtisDynamicFormsAPI.Services.Implementations;
using static OtisDynamicFormsAPI.Services.Implementations.UsersServices;

namespace OtisDynamicFormsAPI.Services.Interfaces
{
    public interface IUsersServices
    {
        Task<ApplicationUser> GetUserById(string userId);
        Task<List<ApplicationUser>> GetAllUsers();
        //Task<ApplicationUser> CreateUser(ApplicationUser user);
        Task<ApplicationUser> UpdateUser(string userId, ApplicationUser updatedUser);
        bool DeleteUser(string userId);
        List<ApplicationUser> GetUsersInGroup(int groupId);
        OperationResult AddUsersToGroup(int groupId, List<string> userIds);
        OperationResult DeleteUserFromGroup(int groupId, string userId);
    }
}
