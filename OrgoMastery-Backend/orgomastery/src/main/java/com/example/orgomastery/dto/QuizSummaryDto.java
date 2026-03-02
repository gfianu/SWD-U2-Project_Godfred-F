package com.example.orgomastery.dto;

public class QuizSummaryDto {

    private Long id;
    private Long lectureId;
    private String title;
    private String description;

    public QuizSummaryDto() {}

    public QuizSummaryDto(Long id, Long lectureId, String title, String description) {
        this.id = id;
        this.lectureId = lectureId;
        this.title = title;
        this.description = description;
    }

    public Long getId() { return id; }
    public Long getLectureId() { return lectureId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
}
