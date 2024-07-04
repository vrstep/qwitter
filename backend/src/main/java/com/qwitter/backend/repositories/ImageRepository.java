package com.qwitter.backend.repositories;

import com.qwitter.backend.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    Optional<Image> findByName(String name);

}
