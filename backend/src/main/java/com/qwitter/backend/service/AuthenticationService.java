package com.qwitter.backend.service;

import com.qwitter.backend.config.JwtService;
import com.qwitter.backend.dto.AuthenticationRequest;
import com.qwitter.backend.dto.AuthenticationResponse;
import com.qwitter.backend.dto.RegisterRequest;
import com.qwitter.backend.enums.Role;
import com.qwitter.backend.exceptions.EmailAlreadyTakenException;
import com.qwitter.backend.exceptions.EmailValidationException;
import com.qwitter.backend.exceptions.IncorrectUsernameOrPwdException;
import com.qwitter.backend.exceptions.PasswordValidationException;
import com.qwitter.backend.models.User;
import com.qwitter.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+\\.)+[A-Za-z]{2,}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        if (matcher.matches()) {
            try {
                InternetAddress emailAddr = new InternetAddress(email);
                emailAddr.validate();
                return true;
            } catch (AddressException ex) {
                return false;
            }
        } else {
            return false;
        }
    }

    public String isValidPassword(String password) {
        if (password.length() < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!password.matches(".*[A-Z].*")) {
            return "Password must contain at least one uppercase letter";
        }
        if (!password.matches(".*[a-z].*")) {
            return "Password must contain at least one lowercase letter";
        }
        if (!password.matches(".*[0-9].*")) {
            return "Password must contain at least one digit";
        }
        return null;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        if (!isValidEmail(request.getEmail())) {
            throw new EmailValidationException("Invalid email address");
        }
        String pass = isValidPassword(request.getPassword());
        if (pass != null) {
            throw new PasswordValidationException(pass);
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyTakenException("Email already taken!");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new IncorrectUsernameOrPwdException("Incorrect email or password");
        }

        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
