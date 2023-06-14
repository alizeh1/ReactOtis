using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace OtisDynamicFormsModels
{
    public class ApplicationUser : IdentityUser
    {
        [JsonIgnore]
        public ICollection<UserGroup> UGroups { get; set; } // Update property name to UserGroups
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
