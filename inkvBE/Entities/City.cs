
using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        [Required]
        public string? CityName { get; set; }
    }
}