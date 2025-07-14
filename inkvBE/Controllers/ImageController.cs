
using System.Security.Claims;
using Amazon.S3;
using inkvBE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace inkvBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        // MAX FILE SIZE (1 MB)
        const int MAX_FILE_SIZE = 1 * 1024 * 1024;

        private readonly IAmazonS3 _clientS3;
        private readonly IImageService _imageService;
        public ImageController(IAmazonS3 clientS3, IImageService imageService)
        {
            _clientS3 = clientS3;
            _imageService = imageService;
        }


        [HttpPost("upload")]
        [Authorize]
        public async Task<ActionResult> UploadImage([FromForm] IFormFile image)
        {
            // Image validation
            if (image == null || image.Length < 1)
                return BadRequest(new { message = "No image was attached." });

            if (image.Length > MAX_FILE_SIZE)
                return BadRequest(new { message = "Image size is too big. It shouldn't exceed 1 MB" });

            if (_imageService.CheckImageType(image) == null)
                return BadRequest(new { message = "Unsupported file format. The file should be either JPEG or PNG" });

            // Extract user ID from JWT
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "No user identification was found" });

            // Try to upload the image
            bool result = await _imageService.UploadImageToS3(image, _clientS3, userId);

            return result ?
                Ok(new { message = "Image uploaded successfully." }) :
                StatusCode(500, new { message = "An internal server error occured."});
        }
    }
}