using System.Collections.Generic;
using System.Drawing;

namespace DataAccess.Models
{
    public class Point
    {
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Radius { get; set; }
        public string Color { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
