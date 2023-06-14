using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OtisDynamicFormsModels
{
    public class UserGroup
    {
       
        public string UserId { get; set; }
        public ApplicationUser AppUser { get; set; }

        public int GroupId { get; set; }
        public GroupModel Groups { get; set; }
    }
}
