using DataAccess;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PointsController : ControllerBase
    {
        private readonly ILogger<Point> _logger;
        private readonly PointsContext _context;

        public PointsController(ILogger<Point> logger, PointsContext context)
        {
            _logger = logger;
            _context = context;

            _context.Database.EnsureCreated();
        }

        [HttpGet]
        public IEnumerable<Point> Get()
        {
            var points = _context.Points.ToList();
            return points;
        }

        [HttpDelete("{id}")]
        public IActionResult Index([FromRoute] int id)
        {
            var point = _context.Points.Find(id);
            _context.Points.Remove(point);
            _context.SaveChanges();
            return Ok();
        }
    }
}
