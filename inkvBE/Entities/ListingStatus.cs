using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class ListingStatus
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string? Status { get; set; }
    }
}