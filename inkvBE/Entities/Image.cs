using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class Image
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string? Url { get; set; }

        public int ListingId { get; set; }
        public Listing? Listing { get; set; }
    }
}