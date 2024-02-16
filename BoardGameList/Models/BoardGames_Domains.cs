using System.ComponentModel.DataAnnotations;

namespace BoardGameList.Models
{
    //create public class
    public class BoardGames_Domains
    {
        [Key]
        [Required]
        public int BoardGameId { get; set; }
        
        [Key]
        [Required]
        public int DomainId { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        public BoardGame? BoardGame { get; set; }

        public Domains? Domain { get; set; }
    }
}