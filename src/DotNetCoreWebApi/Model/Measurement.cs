using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetCoreWebApi.Model
{
    public class Measurement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "decimal(4,2)")]
        public decimal Value { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
