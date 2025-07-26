using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class ListingCondition
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string? Condition { get; set; }
    }
}