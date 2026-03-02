package com.example.orgomastery.dto;

import java.util.List;

public class LectureDetailDto {

    private Long id;
    private String title;

    private List<LectureVideoDto> videos;
    private List<LectureNoteDto> notes;
    private List<QuizSummaryDto> quizzes;

    public LectureDetailDto() {}

    public LectureDetailDto(
            Long id,
            String title,
            List<LectureVideoDto> videos,
            List<LectureNoteDto> notes,
            List<QuizSummaryDto> quizzes
    ) {
        this.id = id;
        this.title = title;
        this.videos = videos;
        this.notes = notes;
        this.quizzes = quizzes;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public List<LectureVideoDto> getVideos() { return videos; }
    public List<LectureNoteDto> getNotes() { return notes; }
    public List<QuizSummaryDto> getQuizzes() { return quizzes; }
}
