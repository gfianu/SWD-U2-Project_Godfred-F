package com.example.orgomastery.dto;

public class LectureVideoDto {

    private Long id;
    private String name;
    private String url;

    public LectureVideoDto() {}

    public LectureVideoDto(Long id, String name, String url) {
        this.id = id;
        this.name = name;
        this.url = url;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getUrl() { return url; }
}
