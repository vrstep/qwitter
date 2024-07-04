package com.qwitter.backend.controllers;

import com.qwitter.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {
    public final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable String filename) {
        byte[] imageBytes = imageService.downloadImage(filename);
        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(imageService.getImageType(filename)))
                .body(imageBytes);
    }
}
