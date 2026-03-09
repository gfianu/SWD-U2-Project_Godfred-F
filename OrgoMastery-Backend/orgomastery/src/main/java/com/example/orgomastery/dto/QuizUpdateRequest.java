package com.example.orgomastery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class QuizUpdateRequest {

    @NotBlank
    @Size(max = 255)
    private String title;

    private String description;

    public QuizUpdateRequest() {
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
