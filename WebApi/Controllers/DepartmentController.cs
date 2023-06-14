using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model.Repository;
using WebApi.Model;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[AllowAnonymous]

    //[Route("api/[controller]")]
    //[ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _department;
        public DepartmentController(IDepartmentRepository department)
        {
            _department = department ??
                throw new ArgumentNullException(nameof(department));
        }

        //[HttpGet(Name = "GetDepartment")]
        [HttpGet("getdepartment")]
        //[Route("GetDepartment")]
        public async Task<IActionResult> GetDepartment()
        {
            return Ok(await _department.GetDepartment());
        }

        //[HttpGet(Name = "GetDepartmentByID/{Id}")]
        [HttpGet("GetDepartmentByID")]
        //[Route("GetDepartmentByID/{Id}")]
        public async Task<IActionResult> GetDepartmentByID(int Id)
        {
            return Ok(await _department.GetDepartmentByID(Id));
        }

        //[HttpPost(Name = "AddDepartment")]
        [HttpPost("AddDepartment")]
        //[Route("AddDepartment")]
        public async Task<IActionResult> AddDepartment(Department dep)
        {
            var result = await _department.InsertDepartment(dep);
            if (result.DepartmentId == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }

        //[HttpPut(Name = "UpdateDepartment")]
        [HttpPut("UpdateDepartment")]
        //[Route("UpdateDepartment")]
        public async Task<IActionResult> UpdateDepartment(Department dep)
        {
            //Department department = new Department();
            //department.DepartmentId = id;
            //department.DepartmentName = dep.DepartmentName;
            await _department.UpdateDepartment(dep);
            return Ok("Updated Successfully");
        }

        //[HttpDelete(Name = "DeleteDepartment")]
        [HttpDelete("DeleteDepartment/{id}")]
        //[HttpDelete("{id}")]
        //[Route("DeleteDepartment")]
        public JsonResult DeleteDepartment(int id)
        {
            _department.DeleteDepartment(id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
