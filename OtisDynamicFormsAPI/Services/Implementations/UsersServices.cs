using AutoMapper.Execution;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsAPI.Services.Interfaces;
using OtisDynamicFormsModels;
using OtisDynamicFormsModels.Authentication.SignUp;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.ComponentModel;
using System.Diagnostics.Metrics;
using System.Threading.Channels;

namespace OtisDynamicFormsAPI.Services.Implementations
{
    public class UsersServices : IUsersServices
    {

        public readonly ApplicationDbContext dbContext;

        public UsersServices(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
            //_userManager = userManager;

        }


        public async Task<ApplicationUser> GetUserById(string userId)
        {
            var user = await dbContext.Users.FindAsync(userId);
            return user;

        }

        public async Task<List<ApplicationUser>> GetAllUsers()
        {
            var user = await dbContext.Users.ToListAsync();
            return user;
        }


        // POST api/user

        //public async Task<ApplicationUser> CreateUser(ApplicationUser user)
        //{

        //    var status = new Status();
        //    //check user existence
        //    var userExist = await _userManager.FindByNameAsync(user.UserName);
        //    if (userExist != null)
        //    {
        //        status.StatusCode = StatusCodes.Status403Forbidden;
        //        status.Message = "User already exists";
        //        return status;
        //    }

        //    //Add User in Database

        //    ApplicationUser newuser = new ApplicationUser
        //    {
        //        SecurityStamp = Guid.NewGuid().ToString(),
        //        Email = registerUser.Email,
        //        UserName = registerUser.UserName,
        //        EmailConfirmed = true,
        //        FirstName = registerUser.FirstName,
        //        LastName = registerUser.LastName,
        //        PhoneNumber = registerUser.PhoneNumber

        //    };

        //    if (await _roleManager.RoleExistsAsync("User"))
        //    {
        //        var result = await _userManager.CreateAsync(newuser, registerUser.Password);
        //        if (!result.Succeeded)
        //        {
        //            status.StatusCode = StatusCodes.Status403Forbidden;
        //            status.Message = "User Creation Failed";
        //            return status;
        //        }
        //        //Add role to user.
        //        await _userManager.AddToRoleAsync(newuser, "User");

        //        status.StatusCode = StatusCodes.Status200OK;
        //        status.Message = "User Created Successfully";
        //        return status;
        //    }
        //    else
        //    {
        //        status.StatusCode = StatusCodes.Status500InternalServerError;
        //        status.Message = "This Role Does not Exist";
        //        return status;
        //    }
        //}

        // public async Task<ApplicationUser> UpdateUser(string userid, ApplicationUser user)

        //user.Id = userid;
        //dbContext.Entry(user).State = EntityState.Modified;
        //dbContext.SaveChanges();
        //// Return the updated group
        //return user;
        public async Task<ApplicationUser> UpdateUser(string userId, ApplicationUser updatedUser)
        {
            var existingUser = await dbContext.Users.FindAsync(userId);
            if (existingUser == null)
            {
                // User with the provided userId does not exist
                return null;
            }

            //Update the properties of the existing user entity
            existingUser.UserName = updatedUser.UserName;
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.Email = updatedUser.Email;
            existingUser.NormalizedEmail = updatedUser.NormalizedEmail;
            existingUser.NormalizedUserName = updatedUser.NormalizedUserName;
            // existingUser.NormalizedUserName = updatedUser.NormalizedUserName;
            dbContext.Update(existingUser);
            //dbContext.Users.Update(updatedUser);
            //dbContext.Entry(existingUser).Reload();
            dbContext.SaveChanges();
            // Return the updated userupdatedUser

            // Return the updated user
            return existingUser;
        }

        public bool DeleteUser(string userId)
        {
            bool result = false;
            var user = dbContext.Users.Find(userId);
            if (user != null)
            {
                dbContext.Entry(user).State = EntityState.Deleted;
                dbContext.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }

        public List<ApplicationUser> GetUsersInGroup(int groupId)
        {
            // Retrieve the group entity based on the provided groupId
            var group = dbContext.Groups.FirstOrDefault(g => g.GroupId == groupId);

            if (group == null)
            {
                // Group with the provided groupId does not exist
                return null;
            }

            // Retrieve the users in the group
            var users = dbContext.UserGroups
                .Where(ug => ug.GroupId == groupId)
                .Select(ug => ug.AppUser)
                .ToList();

            return users;
        }


        public OperationResult AddUsersToGroup(int groupId, List<string> userIds)
        {
            // Retrieve the group entity based on the provided groupId
            var group = dbContext.Groups.FirstOrDefault(g => g.GroupId == groupId);
            bool flgUserId;
            //List<UserGroup> userGroups = dbContext.UserGroups.Where(g => g.GroupId == groupId).ToList();
            if (group == null)
            {
                return new OperationResult(false, $"Group with ID {groupId} does not exist.");
            }
            else
            if (userIds?.Any() == true)
            {
                // var userExistsInGroup = userGroups.Any(mapping => mapping.GroupId == groupId && userIds.Contains(mapping.UserId));
                foreach (string userId in userIds)
                {
                    var getUserGroup = dbContext.UserGroups.FirstOrDefault(ug => ug.GroupId == groupId && ug.UserId == userId);
                    if (getUserGroup != null)
                    {
                        flgUserId = true;
                        // return new OperationResult(true, "User Already Exists");
                    }
                    else
                    {
                        var user = dbContext.Users.FirstOrDefault(u => u.Id == userId);
                        if (user == null)
                        {
                            return new OperationResult(false, $"User with ID {userId} does not exist.");
                        }
                        // Create a new UserGroup entity to represent the relationship
                        var userGroup = new UserGroup
                        {
                            UserId = userId,
                            GroupId = groupId
                        };
                        // Add the UserGroup entity to the UserGroups table
                        dbContext.UserGroups.Add(userGroup);
                        // Save the changes to the database
                        dbContext.SaveChanges();
                        return new OperationResult(true, "Users added to the group successfully.");
                    }
                }
            }
            return new OperationResult(false, "Please select users");
        }
        public OperationResult DeleteUserFromGroup(int groupId, string userId)
        {
            // Retrieve the user-group relationship entity
            var userGroup = dbContext.UserGroups.FirstOrDefault(ug => ug.GroupId == groupId && ug.UserId == userId);
            if (userGroup == null)
            {
                return new OperationResult(false, "User is not part of the group.");
            }
            // Remove the user-group relationship entity
            dbContext.UserGroups.Remove(userGroup);
            dbContext.SaveChanges();
            return new OperationResult(true, "User removed from the group successfully.");
        }

        public class OperationResult
        {
            public bool Success { get; }
            public string Message { get; }

            public OperationResult(bool success, string message)
            {
                Success = success;
                Message = message;
            }
        }
    }

}
