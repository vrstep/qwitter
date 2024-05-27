package com.qwitter.backend.service;

import com.qwitter.backend.dto.ChangePasswordRequest;
import com.qwitter.backend.models.User;

import java.security.Principal;
import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(Integer id);
    User deleteUserById(Integer id);
    User changeEmail(Integer id, String email);
    User changeUsername(Integer id, String username);
    void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
