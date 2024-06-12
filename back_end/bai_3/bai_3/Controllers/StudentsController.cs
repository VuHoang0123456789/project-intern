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
    [Route("api/v1/student")]
    [Produces("application/json")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly QLSinhVienContext _context;

        public StudentsController(QLSinhVienContext context)
        {
            _context = context;
        }
        [HttpGet("get-students/")]
        public async Task<ActionResult<PaginationList>> GetStudents(string? searchValue,  string? column, bool type,int pageIndex = 0, int pageSize = 10)
        {
            List<Student>? students = null;

            if (_context.Students == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(searchValue)) {
                students = await _context.Students.
                    AsNoTracking().
                    Where(s => s.Student_code.Contains(searchValue) ||
                    s.Student_name.Contains(searchValue) ||
                    s.Birth_day.ToString().Contains(searchValue)).
                    OrderBy(s => s.Student_id).
                    ToListAsync();

                students = students.Count() == 0 ? null : students;

                if (students == null) return NoContent();
            }

            if (students == null)
            {
                students = await _context.Students.AsNoTracking().OrderBy(s => s.Student_id).ToListAsync();


                students = students.Count() == 0 ? null : students;

                if (students == null) return NoContent();
            }

            if (!string.IsNullOrEmpty(column)){
                if (!type)
                {
                    if (column == "student_code")
                        students = students.OrderByDescending(s => s.Student_code).ToList();
                    if (column == "student_name")
                        students = students.OrderByDescending(s => s.Student_name).ToList();
                    if (column == "birth_day")
                        students = students.OrderByDescending(s => s.Birth_day).ToList();
                }
                else
                {
                    if (column == "student_code")
                        students = students.OrderBy(s => s.Student_code).ToList();
                    if (column == "student_name")
                        students = students.OrderBy(s => s.Student_name).ToList();
                    if (column == "birth_day")
                        students = students.OrderBy(s => s.Birth_day).ToList();
                }

            }

            if (pageIndex < 0)
            {
                pageIndex = 0;
            }
            else if (pageIndex > 0)
            {
                pageIndex = pageIndex * pageSize - 1;
            }

            var count = students.Count();

            int totalPage = (int)Math.Ceiling(count / (Double)pageSize);

            if (totalPage > 1)
            {
                students = students.Skip(pageIndex).Take(pageSize).ToList();

                students = students.Count() == 0 ? null : students;
            }

            if (students == null)
            {
                return NoContent();
            }

            PaginationList pagination = new(totalPage, pageIndex, students);


            return pagination;
        }

        [HttpGet("get-student/{studentCode}")]
        public async Task<ActionResult<Student>> GetStudent(string studentCode)
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            var student = await _context.Students.AsNoTracking().FirstOrDefaultAsync(student => student.Student_code == studentCode);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        [HttpPut("update-student/{studentCode}")]
        public async Task<IActionResult> PutStudent(string studentCode, Student student)
        {
            if (studentCode != student.Student_code)
            {
                return BadRequest();
            }

            var studentDB = await _context.Students.FirstOrDefaultAsync(fa => fa.Student_code == studentCode);

            if (studentDB == null)
            {
                return NotFound();
            }

            studentDB.Student_name = student.Student_name;
            studentDB.Birth_day = student.Birth_day;
            studentDB.Factulty_id = student.Factulty_id;
            studentDB.Geneder = student.Geneder;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(studentCode))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Cập nhật thành công!");
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("add-student")]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            student.Student_id = null;
            if (_context.Students == null)
            {
                return Problem("Entity set 'QLSinhVienContext.Students'  is null.");
            }
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { studentCode = student.Student_code }, student);
        }

        // DELETE: api/Students/5
        [HttpDelete("delete-student/{studentCode}")]
        public async Task<IActionResult> DeleteStudent(string studentCode)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FirstOrDefaultAsync(stu => stu.Student_code == studentCode);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok("Xoá sinh viên thành công!");
        }

        // DELETE: api/Student
        [HttpDelete("delete-mutile-student")]
        public async Task<IActionResult> DeleteMutileStudent(string[] studentCodes)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }

            foreach (var studentCode in studentCodes)
            {
                var student = await _context.Students.FirstOrDefaultAsync(stu => stu.Student_code == studentCode);

                if (student != null)
                {
                    _context.Students.Remove(student);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception) { throw; }
            
            return Ok("Xoá sinh viên thành công!");
        }

        private bool StudentExists(string id)
        {
            return (_context.Students?.Any(e => e.Student_code == id)).GetValueOrDefault();
        }
    }
}
