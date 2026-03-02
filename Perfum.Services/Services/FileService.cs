namespace Perfum.MVC;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Perfum.MVC.Services;

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _environment;
    private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
    private const int _maxFileSize = 5 * 1024 * 1024; // 5MB

    public FileService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    // ================= SAVE =================
    public async Task<string> SaveImageAsync(IFormFile file, string folderName)
    {
        ValidateFile(file);

        string uploadsFolder = Path.Combine(_environment.WebRootPath, folderName);

        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        string uniqueFileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        string filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return Path.Combine(folderName, uniqueFileName).Replace("\\", "/");
    }

    // ================= DELETE =================
    public void DeleteImage(string imagePath)
    {
        if (string.IsNullOrEmpty(imagePath))
            return;

        string fullPath = Path.Combine(_environment.WebRootPath, imagePath);

        if (File.Exists(fullPath))
            File.Delete(fullPath);
    }

    // ================= REPLACE =================
    public async Task<string> ReplaceImageAsync(IFormFile file, string folderName, string oldImagePath)
    {
        DeleteImage(oldImagePath);
        return await SaveImageAsync(file, folderName);
    }

    // ================= VALIDATION =================
    private void ValidateFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new Exception("File is empty.");

        if (file.Length > _maxFileSize)
            throw new Exception("File size exceeds 5MB.");

        string extension = Path.GetExtension(file.FileName).ToLower();

        if (!_allowedExtensions.Contains(extension))
            throw new Exception("Invalid file type.");
    }
}