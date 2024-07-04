package com.qwitter.backend.service;

import com.qwitter.backend.models.Image;
import com.qwitter.backend.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Transactional
public class ImageService {

    private final ImageRepository imageRepository;
    private static final File IMAGE_DIRECTORY = new File("/home/vrstep/Narxoz/Enterprise/qwitter/backend/img");
    private static final String IMAGE_URL = "http://localhost:8080/api/v1/images/";

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image uploadImage(MultipartFile file, String prefix) {
        try {
            String extension = "." + file.getContentType().split("/")[1];
            File img = File.createTempFile(prefix, extension, IMAGE_DIRECTORY);
            file.transferTo(img);
            String imageURL = IMAGE_URL + img.getName();
            Image i = Image.builder()
                    .name(img.getName())
                    .type(file.getContentType())
                    .path(img.getAbsolutePath())
                    .url(imageURL)
                    .build();
            Image saved = imageRepository.save(i);
            return saved;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public byte[] downloadImage(String filename) {
        try {
            Image image = imageRepository.findByName(filename).orElseThrow(() -> new RuntimeException("Image not found"));
            String filePath = image.getPath();

            byte[] imageBytes = Files.readAllBytes(new File(filePath).toPath());

            return imageBytes;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getImageType(String filename) {
        Image image = imageRepository.findByName(filename).orElseThrow(() -> new RuntimeException("Image not found"));
        return image.getType();
    }
}

