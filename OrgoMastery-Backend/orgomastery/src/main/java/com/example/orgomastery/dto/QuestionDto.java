package com.example.orgomastery.dto;

import java.util.List;

public class QuestionDto {

    private Long id;
    private String prompt;
    private List<String> options; // ["A", "B", "C", "D"] in order

    public QuestionDto() {}

    public QuestionDto(Long id, String prompt, List<String> options) {
        this.id = id;
        this.prompt = prompt;
        this.options = options;
    }

    public Long getId() { return id; }
    public String getPrompt() { return prompt; }
    public List<String> getOptions() { return options; }
}
