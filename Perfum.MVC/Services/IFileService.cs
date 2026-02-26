namespace Perfum.MVC;

public interface IFileService
{
    Task<string> SaveImageAsync(IFormFile file, string folderName);
    Task<string> ReplaceImageAsync(IFormFile file, string folderName, string oldImagePath);
    void DeleteImage(string imagePath);
}
