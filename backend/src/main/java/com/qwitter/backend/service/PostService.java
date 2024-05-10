package com.qwitter.backend.service;

import com.qwitter.backend.models.Post;
import com.qwitter.backend.models.User;
import com.qwitter.backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserService userService;

    @Autowired
    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Integer id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public List<Post> getPostsByAuthor(Integer id) {
        User author = userService.getUserById(id);
        return postRepository.findAllByAuthor(author);
    }

    public Post createPost(Post post) {
        post.setPosted_date(new Date());
        User author = userService.getUserById(post.getAuthor().getId());
        post.setAuthor(author);
        return postRepository.save(post);
    }

    public Post updatePost(Integer id, Post post) {
        Post existingPost = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        existingPost.setContent(post.getContent());
        return postRepository.save(existingPost);
    }

    public Post deletePost(Integer id) {
        Post existingPost = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.deleteById(id);
        return existingPost;
    }
}
