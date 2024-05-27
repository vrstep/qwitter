package com.qwitter.backend.service;

import com.qwitter.backend.models.Post;
import com.qwitter.backend.models.User;
import com.qwitter.backend.repositories.PostRepository;
import com.qwitter.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LikeService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public LikeService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public void likePost(Integer postId, Integer userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        post.getLikes().add(user);
        postRepository.save(post);
    }
}
