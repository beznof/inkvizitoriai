using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(254)]
        public string? Email { get; set; }

        [Required]
        [StringLength(64)]
        public string? Password { get; set; }

        [Required]
        [StringLength(20)]
        public string? Role { get; set; } = "user";
    }
}