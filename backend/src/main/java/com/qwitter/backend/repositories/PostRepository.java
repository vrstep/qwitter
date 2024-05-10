package com.qwitter.backend.repositories;

import com.qwitter.backend.models.Post;
import com.qwitter.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<Post> findById(Integer id);
    List<Post> findAllByAuthor(User author);
}
