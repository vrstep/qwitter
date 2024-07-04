package com.qwitter.backend.utils;

import com.qwitter.backend.models.Post;

import java.util.List;

public interface SortStrategy {
    List<Post> sort(List<Post> posts);
}
