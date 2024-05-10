package com.qwitter.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
