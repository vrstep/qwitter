package com.qwitter.backend.controllers;

import com.qwitter.backend.command.BookmarkCommand;
import com.qwitter.backend.command.Command;
import com.qwitter.backend.command.CommandInvoker;
import com.qwitter.backend.command.LikeCommand;
import com.qwitter.backend.models.Post;
import com.qwitter.backend.service.*;
import com.qwitter.backend.utils.SortStrategyFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;
    private final LikeService likeService;
    private final CommandInvoker commandInvoker;
    private final SortByDateStrategy sortStrategy;
    private final SortStrategyFactory sortStrategyFactory;

    public PostController(PostService postService, LikeService likeService, CommandInvoker commandInvoker) {
        this.postService = postService;
        this.likeService = likeService;
        this.commandInvoker = commandInvoker;
        this.sortStrategy = new SortByDateStrategy();
        this.sortStrategyFactory = new SortStrategyFactoryImpl();
    }

    @GetMapping
    public List<Post> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return sortStrategyFactory.getSortStrategy("date").sort(posts);
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
        Command command = new LikeCommand(likeService, postId, userId);
        commandInvoker.executeCommand(command);
    }

    @PostMapping("/{postId}/unlike/{userId}")
    public void unlikePost(@PathVariable Integer postId, @PathVariable Integer userId) {
        commandInvoker.undoLastCommand();
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
        Command command = new BookmarkCommand(postService, postId, userId);
        commandInvoker.executeCommand(command);
    }

    @PostMapping("/{postId}/unbookmark/{userId}")
    public void unbookmarkPost() {
        commandInvoker.undoLastCommand();
    }
}
