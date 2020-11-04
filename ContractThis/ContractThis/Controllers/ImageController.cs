using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _webhost;
        public ImageController(IWebHostEnvironment webhost)
        {
            _webhost = webhost;
        }

        [HttpPost]
        public IActionResult Upload(IFormFile file)
        {
            //path to images
            var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
            try
            {
                using var image = Image.Load(file.OpenReadStream());

                int originalWidth = image.Width;
                int originalHeight = image.Height;

                //set maximum size
                int maxWidth = 450;
                if (originalWidth > maxWidth)
                {
                    int newHeight = maxWidth * originalHeight;
                    newHeight /= originalWidth;

                    image.Mutate(i => i.Resize(maxWidth, newHeight));
                }

                image.Save(savedImagePath + file.FileName);
            }
            catch
            {
                return Conflict();
            }

            return Ok();
        }

        [HttpGet("{imageUrl}")]
        public IActionResult Get(string imageUrl)
        {
            var path = Path.Combine(_webhost.WebRootPath, "images/", imageUrl);
            var imageFileStream = System.IO.File.OpenRead(path);
            return File(imageFileStream, "image/jpeg");
        }
    }
}
