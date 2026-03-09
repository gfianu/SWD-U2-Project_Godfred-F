package com.example.orgomastery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class QuizCreateRequest {

    @NotNull
    private Long lectureId;

    @NotBlank
    @Size(max = 255)
    private String title;

    private String description;

    public QuizCreateRequest() {
    }

    public Long getLectureId() {
        return lectureId;
    }

    public void setLectureId(Long lectureId) {
        this.lectureId = lectureId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
