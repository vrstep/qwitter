package com.qwitter.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ChangePasswordRequest {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
