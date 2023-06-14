using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsAPI.Services.Interfaces;
using OtisDynamicFormsModels;
using System.Text.RegularExpressions;
namespace OtisDynamicFormsAPI.Services.Implementations
{
    public class GroupServices : IGroupServices
    {
        public readonly ApplicationDbContext dbContext;
        public GroupServices(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
        }
        public GroupModel GetGroup(int groupId)
        {
            // Retrieve the Group entity from the database
            var groupModel = dbContext.Groups.Find(groupId);
            return groupModel;
        }
        public List<GroupModel> GetAllGroups()
        {
            // Retrieve all Group entities from the database
            var groups = dbContext.Groups.ToList();
            return groups;
        }
        // POST api/group
        public GroupModel CreateGroup(GroupModel groups)
        {
            groups.CreatedBy = "ABC";
            groups.CreatedOn = DateTime.Now;
            dbContext.Groups.Add(groups);
            dbContext.SaveChanges();
            return groups;
        }
        public GroupModel UpdateGroup(int groupId, GroupModel group)
        {
            group.GroupId = groupId;
            group.ModifiedBy = "ABC";
            group.ModifiedOn = DateTime.Now;
            dbContext.Entry(group).State = EntityState.Modified;
            dbContext.SaveChanges();
            // Return the updated group
            return group;
        }
        public bool DeleteGroup(int groupId)
        {
            bool result = false;
            var group = dbContext.Groups.Find(groupId);
            if (group != null)
            {
                dbContext.Entry(group).State = EntityState.Deleted;
                dbContext.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }
    }
}