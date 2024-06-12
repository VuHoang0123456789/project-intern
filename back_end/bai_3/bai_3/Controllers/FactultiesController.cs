using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bai_3.Context;
using bai_3.Models;

namespace bai_3.Controllers
{
    [Route("api/v1/factulty")]
    [ApiController]
    public class FactultiesController : ControllerBase
    {
        private readonly QLSinhVienContext _context;

        public FactultiesController(QLSinhVienContext context)
        {
            _context = context;
        }

        // GET: api/Factulties
        [HttpGet("get-factulties")]
        public async Task<ActionResult<IEnumerable<Factulty>>> GetFactulty()
        {
          if (_context.Factulty == null)
          {
              return NotFound();
          }
            return await _context.Factulty.AsNoTracking().ToListAsync();
        }

        // GET: api/Factulties/5
        [HttpGet("get-factulty/{factultyCode}")]
        public async Task<ActionResult<Factulty>> GetFactulty(string factultyCode)
        {
          if (_context.Factulty == null)
          {
              return NotFound();
          }
            var factulty = await _context.Factulty.AsNoTracking().FirstOrDefaultAsync(fa => fa.Factulty_code == factultyCode);

            if (factulty == null)
            {
                return NotFound();
            }

            return factulty;
        }

        // PUT: api/Factulties/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("update-factulty/{factultyCode}")]
        public async Task<IActionResult> PutFactulty(string factultyCode, Factulty factulty)
        {
            if (factultyCode != factulty.Factulty_code)
            {
                return BadRequest();
            }

            var factultyDB = await _context.Factulty.FirstOrDefaultAsync(fa => fa.Factulty_code == factultyCode);

            if (factultyCode == null || factultyDB == null)
            {
                return NotFound();
            }

            factultyDB.Factulty_name = factulty.Factulty_name; ;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FactultyExists(factultyCode))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Cập nhật thành công");
        }

        // POST: api/Factulties
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("add-factulty")]
        public async Task<ActionResult<Factulty>> PostFactulty(Factulty factulty)
        {
            factulty.Factulty_id = null;
          if (_context.Factulty == null)
          {
              return Problem("Entity set 'QLSinhVienContext.Factulty'  is null.");
          }
            _context.Factulty.Add(factulty);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFactulty", new { factultyCode = factulty.Factulty_code }, factulty);
        }

        // DELETE: api/Factulties/5
        [HttpDelete("delete-factulty/{factultyCode}")]
        public async Task<IActionResult> DeleteFactulty(string factultyCode)
        {
            if (_context.Factulty == null)
            {
                return NotFound();
            }
            var factulty = await _context.Factulty.FirstOrDefaultAsync(fa=>fa.Factulty_code == factultyCode);
            if (factulty == null)
            {
                return NotFound();
            }

            _context.Factulty.Remove(factulty);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool FactultyExists(string factultyCode)
        {
            return (_context.Factulty?.Any(e => e.Factulty_code == factultyCode)).GetValueOrDefault();
        }
    }
}
