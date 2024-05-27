package com.qwitter.backend.command;

import com.qwitter.backend.service.PostService;

public class BookmarkCommand implements Command{
    private final PostService postService;
    private final Integer postId;
    private final Integer userId;

    public BookmarkCommand(PostService postService, Integer postId, Integer userId){
        this.postService = postService;
        this.postId = postId;
        this.userId = userId;
    }

    @Override
    public void execute(){
        postService.bookmarkPost(postId, userId);
    }

    @Override
    public void undo(){
        postService.unbookmarkPost(postId, userId);
    }
}
