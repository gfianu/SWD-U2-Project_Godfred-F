package com.example.orgomastery.dto;

import java.time.LocalDateTime;

public class QuizAttemptSummaryDto {

    private Long attemptId;
    private Long quizId;
    private String quizTitle;
    private Long lectureId;
    private String lectureTitle;
    private Integer score;
    private Integer total;
    private LocalDateTime createdAt;

    public QuizAttemptSummaryDto() {
    }

    public QuizAttemptSummaryDto(
            Long attemptId,
            Long quizId,
            String quizTitle,
            Long lectureId,
            String lectureTitle,
            Integer score,
            Integer total,
            LocalDateTime createdAt
    ) {
        this.attemptId = attemptId;
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.lectureId = lectureId;
        this.lectureTitle = lectureTitle;
        this.score = score;
        this.total = total;
        this.createdAt = createdAt;
    }

    public Long getAttemptId() {
        return attemptId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public Long getLectureId() {
        return lectureId;
    }

    public String getLectureTitle() {
        return lectureTitle;
    }

    public Integer getScore() {
        return score;
    }

    public Integer getTotal() {
        return total;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
