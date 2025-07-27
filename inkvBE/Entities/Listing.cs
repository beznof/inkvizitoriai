using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class Listing
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? ListingName { get; set; }

        public List<Image>? Pictures { get; set; }
    }
}