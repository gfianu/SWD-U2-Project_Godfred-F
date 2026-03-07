package com.example.orgomastery.dto;

import java.time.LocalDateTime;

public class StudentAttemptStatsDto {

    private Long userId;
    private String username;
    private String email;

    private Integer attemptCount;
    private Integer bestScore;
    private Integer latestScore;
    private Integer totalQuestions;
    private LocalDateTime latestAttemptAt;

    public StudentAttemptStatsDto() {
    }

    public StudentAttemptStatsDto(
            Long userId,
            String username,
            String email,
            Integer attemptCount,
            Integer bestScore,
            Integer latestScore,
            Integer totalQuestions,
            LocalDateTime latestAttemptAt
    ) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.attemptCount = attemptCount;
        this.bestScore = bestScore;
        this.latestScore = latestScore;
        this.totalQuestions = totalQuestions;
        this.latestAttemptAt = latestAttemptAt;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public Integer getAttemptCount() {
        return attemptCount;
    }

    public Integer getBestScore() {
        return bestScore;
    }

    public Integer getLatestScore() {
        return latestScore;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public LocalDateTime getLatestAttemptAt() {
        return latestAttemptAt;
    }
}
