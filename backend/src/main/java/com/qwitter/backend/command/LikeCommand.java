package com.qwitter.backend.command;

import com.qwitter.backend.service.LikeService;

public class LikeCommand implements Command{
    private final LikeService likeService;
    private final Integer postId;
    private final Integer userId;

    public LikeCommand(LikeService likeService, Integer postId, Integer userId){
        this.likeService = likeService;
        this.postId = postId;
        this.userId = userId;
    }

    @Override
    public void execute(){
        likeService.likePost(postId, userId);
    }

    @Override
    public void undo(){
        likeService.unlikePost(postId, userId);
    }
}
