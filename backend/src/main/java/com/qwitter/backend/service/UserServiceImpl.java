package com.qwitter.backend.service;

import com.qwitter.backend.dto.ChangePasswordRequest;
import com.qwitter.backend.models.User;
import com.qwitter.backend.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAllUsers() {
        log.info("Getting all users");
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        log.info("Getting a user by id: {}", id);
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public User deleteUserById(Integer id) {
        log.info("Deleting a user by id: {}", id);
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(id);
            return optionalUser.get();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public User changeEmail(Integer id, String email) {
        log.info("Changing email for user with id: {}", id);
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setEmail(email);
            userRepository.save(user);
            return user;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public User changeUsername(Integer id, String username) {
        log.info("Changing username for user with id: {}", id);
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUserName(username);
            userRepository.save(user);
            return user;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public void changePassword(ChangePasswordRequest request, Principal connectedUser){
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }
}
