using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace inkvBE.Entities
{
    public class Subcategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? SubcategoryName { get; set; }

        public Category? Category { get; set; }
    }
}