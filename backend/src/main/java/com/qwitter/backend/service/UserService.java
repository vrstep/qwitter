package com.qwitter.backend.service;

import com.qwitter.backend.models.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    void addUser(User user);
    User getUserById(Integer id);
    User deleteUserById(Integer id);

}
