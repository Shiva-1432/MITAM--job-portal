package com.jobportal.service;

import com.jobportal.exception.FileStorageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file, String subDirectory) {
        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir + "/" + subDirectory).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            // Generate unique filename
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID().toString() + fileExtension;

            // Copy file to target location
            Path targetLocation = uploadPath.resolve(newFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return subDirectory + "/" + newFilename;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file. Please try again!", ex);
        }
    }

    public void deleteFile(String filePath) {
        try {
            Path fileToDelete = Paths.get(uploadDir + "/" + filePath).toAbsolutePath().normalize();
            Files.deleteIfExists(fileToDelete);
        } catch (IOException ex) {
            throw new FileStorageException("Could not delete file. Please try again!", ex);
        }
    }
} 