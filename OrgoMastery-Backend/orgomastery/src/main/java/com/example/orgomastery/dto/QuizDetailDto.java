package com.example.orgomastery.dto;

import java.util.List;

public class QuizDetailDto {

    private Long id;
    private Long lectureId;
    private String title;
    private String description;
    private List<QuestionDto> questions;

    public QuizDetailDto() {}

    public QuizDetailDto(Long id, Long lectureId, String title, String description, List<QuestionDto> questions) {
        this.id = id;
        this.lectureId = lectureId;
        this.title = title;
        this.description = description;
        this.questions = questions;
    }

    public Long getId() { return id; }
    public Long getLectureId() { return lectureId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public List<QuestionDto> getQuestions() { return questions; }
}
