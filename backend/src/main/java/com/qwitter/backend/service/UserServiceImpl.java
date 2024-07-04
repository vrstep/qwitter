package com.qwitter.backend.service;

import com.qwitter.backend.dto.ChangePasswordRequest;
import com.qwitter.backend.models.Image;
import com.qwitter.backend.models.User;
import com.qwitter.backend.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ImageService imageService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.imageService = imageService;
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

    @Override
    public User setProfileOrBannerPicture(String username, MultipartFile file, String prefix) {
        Optional<User> optionalUser = userRepository.findByUserName(username);
        Image photo = imageService.uploadImage(file, prefix);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (prefix.equals("pfp")) {
                user.setProfilePicture(photo);
            } else {
                user.setBannerPicture(photo);
            }
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void followUser(Integer followerId, Integer followedId) {
        Optional<User> optionalFollower = userRepository.findById(followerId);
        Optional<User> optionalFollowed = userRepository.findById(followedId);

        if (optionalFollower.isPresent() && optionalFollowed.isPresent()) {
            User follower = optionalFollower.get();
            User followed = optionalFollowed.get();

            follower.getFollowing().add(followed);
            followed.getFollowers().add(follower);

            userRepository.save(follower);
            userRepository.save(followed);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public Set<User> getFollowers(Integer userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getFollowers();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public Set<User> getFollowing(Integer userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getFollowing();
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
