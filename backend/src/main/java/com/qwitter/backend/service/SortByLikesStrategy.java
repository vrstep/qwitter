package com.qwitter.backend.service;

import com.qwitter.backend.models.Post;
import com.qwitter.backend.utils.SortStrategy;

import java.util.Comparator;
import java.util.List;

public class SortByLikesStrategy implements SortStrategy {
    @Override
    public List<Post> sort(List<Post> posts) {
        posts.sort(Comparator.comparing(Post::getLikesCount).reversed());
        return posts;
    }
}
