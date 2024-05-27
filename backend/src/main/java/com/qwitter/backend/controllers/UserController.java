package com.qwitter.backend.controllers;

import com.qwitter.backend.dto.ChangePasswordRequest;
import com.qwitter.backend.models.User;
import com.qwitter.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
}
