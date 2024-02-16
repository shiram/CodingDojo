using System.ComponentModel.DataAnnotations;

namespace BoardGameList.Models
{
    //create public class
    public class BoardGames_Mechanics
    {
        [Key]
        [Required]
        public int BoardGameId { get; set; }
        
        [Key]
        [Required]
        public int MechanicId { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        public BoardGame? BoardGame { get; set; }

        public Mechanics? Mechanic { get; set; }
    }
}