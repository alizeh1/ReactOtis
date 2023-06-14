using AutoMapper;
using OtisDynamicFormsAPI.Data;
using OtisDynamicFormsModels;
using OtisDynamicFormsModels.Authentication.SignUp;

namespace OtisDynamicFormsAPI.Profiles
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<GroupViewModel, GroupModel>();
            CreateMap<RegisterDto, ApplicationUser>();
            CreateMap<RegisterModel, ApplicationUser>();
            // Add more mapping configurations as needed
        }
    }
}
