package com.qwitter.backend.service;

import com.qwitter.backend.models.Post;
import com.qwitter.backend.models.User;
import com.qwitter.backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
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

    public Post getPostById(Integer postId) {
        return postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
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

    public Post replyToPost(Integer postId, Post reply) {
        Post originalPost = getPostById(postId);
        reply.setPosted_date(new Date());
        User author = userService.getUserById(reply.getAuthor().getId());
        reply.setAuthor(author);
        Post savedReply = postRepository.save(reply);
        originalPost.getReplies().add(savedReply);
        postRepository.save(originalPost);
        return savedReply;
    }

    public Post repostPost(Integer postId, Integer userId) {
        Post originalPost = getPostById(postId);
        User user = userService.getUserById(userId);
        originalPost.getReposts().add(user);
        return postRepository.save(originalPost);
    }

    public Post bookmarkPost(Integer postId, Integer userId) {
        Post post = getPostById(postId);
        User user = userService.getUserById(userId);
        post.getBookmarks().add(user);
        return postRepository.save(post);
    }
}
