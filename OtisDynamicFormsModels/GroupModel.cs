using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


namespace OtisDynamicFormsModels
{
    public class GroupModel
    {
        [Key]
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string GroupDescription{ get; set; }
     
        public string CreatedBy{ get; set; }
        public DateTime CreatedOn{ get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn{ get; set; }
        public bool IsActive{ get; set; }

        [JsonIgnore]
        public ICollection<UserGroup>? UGroups { get; set; }
    }// Add ICollection for the many-to-many relationship

}

