using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoardGameList.Models
{
    [Table("Categories")]
    public class Category 
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = null!;

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastTimeModified { get; set; }

        public ICollection<BoardGames_Categories>? BoardGames_Categories { get; set; }

    }
}