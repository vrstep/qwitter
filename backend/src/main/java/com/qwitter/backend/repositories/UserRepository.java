package com.qwitter.backend.repositories;

import com.qwitter.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String userName);

    Optional<User> findById(Integer userId);
}
