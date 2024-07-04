package com.qwitter.backend.controllers;

import com.qwitter.backend.dto.ChangePasswordRequest;
import com.qwitter.backend.models.User;
import com.qwitter.backend.service.ImageService;
import com.qwitter.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

    private final UserService userService;
    private final ImageService imageService;

    @Autowired
    public UserController(UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        log.info("Getting a user by id: {}", id);
        return userService.getUserById(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteUserById(@PathVariable Integer id) {
        log.info("Deleting a user by id: {}", id);
        userService.deleteUserById(id);
    }

    @PutMapping("/changeEmail/{id}")
    public User changeEmail(@PathVariable Integer id, @RequestBody String email) {
        log.info("Changing email for user with id: {}", id);
        return userService.changeEmail(id, email);
    }

    @PutMapping("/changeUsername/{id}")
    public User changeUsername(@PathVariable Integer id, @RequestBody String username) {
        log.info("Changing username for user with id: {}", id);
        return userService.changeUsername(id, username);
    }

    @PutMapping("/changePassword/{id}")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/setProfilePicture/{username}")
    public User setProfilePicture(
            @PathVariable String username,
            @RequestParam("image") MultipartFile file
    ) {
        return userService.setProfileOrBannerPicture(username, file, "pfp");
    }

    @PostMapping("/setBannerPicture/{username}")
    public User setBannerPicture(
            @PathVariable String username,
            @RequestParam("image") MultipartFile file
    ) {
        return userService.setProfileOrBannerPicture(username, file, "bnr");
    }

    @PutMapping("/")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PostMapping("/follow/{followerId}/{followedId}")
    public ResponseEntity<?> followUser(@PathVariable Integer followerId, @PathVariable Integer followedId) {
        log.info("User with id: {} is following user with id: {}", followerId, followedId);
        userService.followUser(followerId, followedId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/followers/{userId}")
    public Set<User> getFollowers(@PathVariable Integer userId) {
        return userService.getFollowers(userId);
    }

    @GetMapping("/following/{userId}")
    public Set<User> getFollowing(@PathVariable Integer userId) {
        return userService.getFollowing(userId);
    }
}
