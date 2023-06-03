using Microsoft.EntityFrameworkCore;
using DataAccess.Models;
using System.Collections.Generic;

namespace DataAccess
{
    public class PointsContext : DbContext
    {
        public DbSet<Point> Points { get; set; }

        public PointsContext(DbContextOptions<PointsContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Point>(b =>
            {
                b.HasData(new Point()
                {
                    Id = 1,
                    X = 800,
                    Y = 125,
                    Radius = 25,
                    Color = "gray"
                }, new Point()
                {
                    Id = 2,
                    X = 125,
                    Y = 250,
                    Radius = 45,
                    Color = "red"
                }, new Point()
                {
                    Id = 3,
                    X = 500,
                    Y = 375,
                    Radius = 5,
                    Color = "#9EFD38"
                });
                b.OwnsMany(e => e.Comments).HasData(new
                {
                    PointId = 1,
                    Id = 11,
                    Text = "Comment 1",
                    BackgroundColor = "white"
                }, new
                {
                    PointId = 1,
                    Id = 12,
                    Text = "Comment 2 very loooooooooooooooong comment",
                    BackgroundColor = "yellow"
                }, new
                {
                    PointId = 1,
                    Id = 13,
                    Text = "Comment 3",
                    BackgroundColor = "#d3d3d3"
                }, new
                {
                    PointId = 2,
                    Id = 14,
                    Text = "Comment 4",
                    BackgroundColor = "white"
                }, new
                {
                    PointId = 2,
                    Id = 15,
                    Text = "Comment 5",
                    BackgroundColor = "#d3d3d3"
                }, new
                {
                    PointId = 3,
                    Id = 16,
                    Text = "Comment 6",
                    BackgroundColor = "white"
                }, new
                {
                    PointId = 3,
                    Id = 17,
                    Text = "Comment 7",
                    BackgroundColor = "#d3d3d3"
                }, new
                {
                    PointId = 3,
                    Id = 18,
                    Text = "Comment 8",
                    BackgroundColor = "white"
                });          
            });
        }
    }
}
