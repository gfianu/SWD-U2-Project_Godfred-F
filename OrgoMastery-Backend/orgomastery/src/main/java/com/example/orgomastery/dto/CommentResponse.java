package com.example.orgomastery.dto;

import java.time.LocalDateTime;

public class CommentResponse {

    private Long id;
    private Long videoId;
    private Long userId;
    private String username;
    private String text;
    private String role;
    private LocalDateTime createdAt;

    public CommentResponse() {
    }

    public CommentResponse(
            Long id,
            Long videoId,
            Long userId,
            String username,
            String text,
            String role,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.videoId = videoId;
        this.userId = userId;
        this.username = username;
        this.text = text;
        this.role = role;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getVideoId() {
        return videoId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getText() {
        return text;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
