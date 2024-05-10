package com.qwitter.backend.dto;

import com.qwitter.backend.models.User;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDto {
    private Integer id;
    private String content;
    private User author;
    private Date posted_date;
}
