package com.qwitter.backend.exceptions;

public class IncorrectUsernameOrPwdException extends RuntimeException{

        public IncorrectUsernameOrPwdException(String message) {
            super(message);
        }

        public IncorrectUsernameOrPwdException(String message, Throwable cause) {
            super(message, cause);
        }
}
