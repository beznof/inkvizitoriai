using System.ComponentModel.DataAnnotations;
using Amazon.Auth.AccessControlPolicy;

namespace inkvBE.Entities
{
    public class Listing
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? ListingName { get; set; }

        [Required]
        public Type? Type { get; set; }

        [Required]
        [StringLength(2000)]
        public string? Description { get; set; }

        public List<Image>? Pictures { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        [Required]
        public DateTime ModificationDate { get; set; }

        [Required]
        public ListingCondition? Condition { get; set; }

        public City? City { get; set; }

        public ListingStatus? Status { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public User? User { get; set; }
    }
}