
using SixLabors.ImageSharp.PixelFormats;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;

namespace inkvBE.Services
{
    public interface IImageService
    {
        public Task<bool> UploadImageToS3(IFormFile image, IAmazonS3 clientS3, string userID);
        public string? CheckImageType(IFormFile image);
    }

    public class ImageService : IImageService
    {
        public async Task<bool> UploadImageToS3(IFormFile image, IAmazonS3 clientS3, string userID)
        {
            // Serializing for transfer
            using var stream = image.OpenReadStream();
            using var imageFromStream = await SixLabors.ImageSharp.Image.LoadAsync<Rgba32>(stream);

            // Naming convention: User ID + ':' + GUID + {extension} 
            string userId = userID;
            string guid = Guid.NewGuid().ToString();
            string extension = Path.GetExtension(image.FileName);
            var fileName = $"{userId}:{guid}{extension}";

            // 
            var putRequest = new PutObjectRequest
            {
                InputStream = stream,                                                       // The file stream
                Key = fileName,                                                             // File's name
                BucketName = Environment.GetEnvironmentVariable("AWS_S3_BUCKET_NAME"),      // Bucket's name
                ContentType = image.ContentType,                                            // Content type
            };

            try
            {
                await clientS3.PutObjectAsync(putRequest);
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;
        }

        public string? CheckImageType(IFormFile image)
        {
            // Buffer for file signature
            byte[] buffer = new byte[8];

            // Reading the signature bytes
            using var stream = image.OpenReadStream();
            stream.Read(buffer, 0, buffer.Length);

            // Checking for signatures
            if (buffer[0] == 0xFF && buffer[1] == 0xD8)
                return "jpeg";

            if (buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E &&
                buffer[3] == 0x47 && buffer[4] == 0x0D && buffer[5] == 0x0A &&
                buffer[6] == 0x1A && buffer[7] == 0x0A)
                return "png";

            return null;
        }
    }
}