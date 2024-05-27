package com.qwitter.backend.controllers;

import com.qwitter.backend.models.Post;
import com.qwitter.backend.service.LikeService;
import com.qwitter.backend.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;
    private final LikeService likeService;

    public PostController(PostService postService, LikeService likeService) {
        this.postService = postService;
        this.likeService = likeService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Integer id) {
        return postService.getPostById(id);
    }

    @GetMapping("/author/{id}")
    public List<Post> getPostsByAuthor(@PathVariable Integer id) {
        return postService.getPostsByAuthor(id);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Integer id) {
        postService.deletePost(id);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Integer id, @RequestBody Post post) {
        return postService.updatePost(id, post);
    }

    @PostMapping("/{postId}/like/{userId}")
    public void likePost(@PathVariable Integer postId, @PathVariable Integer userId) {
        likeService.likePost(postId, userId);
    }

    @PostMapping("/{postId}/reply")
    public Post replyToPost(@PathVariable Integer postId, @RequestBody Post reply) {
        return postService.replyToPost(postId, reply);
    }

    @PostMapping("/{postId}/repost/{userId}")
    public Post repostPost(@PathVariable Integer postId, @PathVariable Integer userId) {
        return postService.repostPost(postId, userId);
    }

    @PostMapping("/{postId}/bookmark/{userId}")
    public void bookmarkPost(@PathVariable Integer postId, @PathVariable Integer userId) {
        postService.bookmarkPost(postId, userId);
    }
}
