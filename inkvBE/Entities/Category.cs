using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? CategoryName { get; set; }
    }
}