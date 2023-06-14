using Microsoft.AspNetCore.Identity;
using OtisDynamicFormsModels;

namespace OtisDynamicFormsAPI.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<UserGroup> UGroups { get; set; }
    }
}
