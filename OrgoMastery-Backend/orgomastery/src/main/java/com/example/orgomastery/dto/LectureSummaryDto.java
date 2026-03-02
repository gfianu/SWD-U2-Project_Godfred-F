package com.example.orgomastery.dto;

public class LectureSummaryDto {

    private Long id;
    private String title;

    public LectureSummaryDto() {}

    public LectureSummaryDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
}
