using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string? Username { get; set; }

        public int UserId { get; set; } 
        public User? User { get; set; } 
    }
}