package com.qwitter.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name = "image_id")
    private Integer id;

    @Column(name = "image_name", unique = true)
    private String name;

    @Column(name = "image_type")
    private String type;

    @Column(name = "image_path")
    @JsonIgnore
    private String path;

    @Column(name = "image_url")
    private String url;
}
