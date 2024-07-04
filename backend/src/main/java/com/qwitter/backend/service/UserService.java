package com.qwitter.backend.service;

import com.qwitter.backend.dto.ChangePasswordRequest;
import com.qwitter.backend.models.User;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Set;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(Integer id);
    User updateUser(User user);
    User deleteUserById(Integer id);
    void followUser(Integer followerId, Integer followedId);
    Set<User> getFollowers(Integer userId);
    Set<User> getFollowing(Integer userId);
    User changeEmail(Integer id, String email);
    User changeUsername(Integer id, String username);
    void changePassword(ChangePasswordRequest request, Principal connectedUser);
    User setProfileOrBannerPicture(String username, MultipartFile file, String prefix);
}
