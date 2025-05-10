package com.jobportal.controller;

import com.jobportal.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload/resume")
    @PreAuthorize("hasRole('JOBSEEKER')")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        String filePath = fileStorageService.storeFile(file, "resumes");
        return ResponseEntity.ok(filePath);
    }

    @PostMapping("/upload/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        String filePath = fileStorageService.storeFile(file, "profiles");
        return ResponseEntity.ok(filePath);
    }

    @DeleteMapping("/{filePath}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteFile(@PathVariable String filePath) {
        fileStorageService.deleteFile(filePath);
        return ResponseEntity.ok().build();
    }
} 