using System.ComponentModel.DataAnnotations;

namespace BoardGameList.Models
{
    public class BoardGames_Categories
    {
        [Key]
        [Required]
        public int BoardGameId { get; set; }
        
        [Key]
        [Required]
        public int CategoryId { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        public BoardGame? BoardGame { get; set; }

        public Category? Category { get; set; }

    }
}