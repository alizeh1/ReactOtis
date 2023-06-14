using OtisDynamicFormsModels;

namespace OtisDynamicFormsAPI.Services.Interfaces
{
    public interface IGroupServices
    {
        GroupModel GetGroup(int groupId);
        List<GroupModel> GetAllGroups();
        GroupModel CreateGroup(GroupModel group);
        GroupModel UpdateGroup(int groupId, GroupModel group);
        bool DeleteGroup(int groupId);

    }
}
