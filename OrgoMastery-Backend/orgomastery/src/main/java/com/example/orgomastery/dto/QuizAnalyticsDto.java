package com.example.orgomastery.dto;

import java.util.List;

public class QuizAnalyticsDto {

    private Long quizId;
    private String quizTitle;
    private Long lectureId;
    private String lectureTitle;

    private Integer attemptCount;
    private Double averageScore;
    private Double averagePercent;
    private Integer highestScore;
    private Integer lowestScore;

    private List<StudentAttemptStatsDto> studentStats;

    public QuizAnalyticsDto() {
    }

    public QuizAnalyticsDto(
            Long quizId,
            String quizTitle,
            Long lectureId,
            String lectureTitle,
            Integer attemptCount,
            Double averageScore,
            Double averagePercent,
            Integer highestScore,
            Integer lowestScore,
            List<StudentAttemptStatsDto> studentStats
    ) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.lectureId = lectureId;
        this.lectureTitle = lectureTitle;
        this.attemptCount = attemptCount;
        this.averageScore = averageScore;
        this.averagePercent = averagePercent;
        this.highestScore = highestScore;
        this.lowestScore = lowestScore;
        this.studentStats = studentStats;
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

    public Integer getAttemptCount() {
        return attemptCount;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public Double getAveragePercent() {
        return averagePercent;
    }

    public Integer getHighestScore() {
        return highestScore;
    }

    public Integer getLowestScore() {
        return lowestScore;
    }

    public List<StudentAttemptStatsDto> getStudentStats() {
        return studentStats;
    }
}
