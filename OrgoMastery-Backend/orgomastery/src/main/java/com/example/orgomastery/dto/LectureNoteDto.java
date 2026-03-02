package com.example.orgomastery.dto;

public class LectureNoteDto {

    private Long id;
    private String name;
    private String noteUrl;
    private String keyUrl;

    public LectureNoteDto() {}

    public LectureNoteDto(Long id, String name, String noteUrl, String keyUrl) {
        this.id = id;
        this.name = name;
        this.noteUrl = noteUrl;
        this.keyUrl = keyUrl;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getNoteUrl() { return noteUrl; }
    public String getKeyUrl() { return keyUrl; }
}
