using System.ComponentModel.DataAnnotations;

namespace inkvBE.Entities
{
    public class Type
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? TypeName { get; set; }

        [Required]
        public Subcategory? Subcategory{ get; set; }
    }
}