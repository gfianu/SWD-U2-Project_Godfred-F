package com.example.orgomastery.controller;

import com.example.orgomastery.dto.*;
import com.example.orgomastery.model.Lecture;
import com.example.orgomastery.model.LectureNote;
import com.example.orgomastery.model.LectureVideo;
import com.example.orgomastery.model.Quiz;
import com.example.orgomastery.repository.LectureRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/lectures")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server; adjust for Netlify later
public class LectureController {

    private final LectureRepository lectureRepository;

    public LectureController(LectureRepository lectureRepository) {
        this.lectureRepository = lectureRepository;
    }

    /**
     * GET /api/lectures
     * Returns: [{ id, title }, ...]
     */
    @GetMapping
    public List<LectureSummaryDto> getAllLectures() {
        List<Lecture> lectures = lectureRepository.findAllByOrderByOrderIndexAscIdAsc();

        return lectures.stream()
                .map(l -> new LectureSummaryDto(l.getId(), l.getTitle()))
                .toList();
    }

    /**
     * GET /api/lectures/{lectureId}
     * Returns: { id, title, videos[], notes[], quizzes[] }
     *
     * NOTE: This was marked @Transactional so lazy-loaded collections (videos/notes/quizzes)
     * can be read safely while the DTO is built.
     */
    @GetMapping("/{lectureId}")
    @Transactional(readOnly = true)
    public ResponseEntity<LectureDetailDto> getLectureDetail(@PathVariable Long lectureId) {

        Lecture lecture = lectureRepository.findById(lectureId).orElse(null);
        if (lecture == null) {
            return ResponseEntity.notFound().build();
        }

        List<LectureVideoDto> videos = lecture.getVideos().stream()
                .sorted(Comparator
                        .comparing((LectureVideo v) -> v.getOrderIndex() == null ? Integer.MAX_VALUE : v.getOrderIndex())
                        .thenComparing(LectureVideo::getId))
                .map(v -> new LectureVideoDto(v.getId(), v.getName(), v.getUrl()))
                .toList();

        List<LectureNoteDto> notes = lecture.getNotes().stream()
                .sorted(Comparator
                        .comparing((LectureNote n) -> n.getOrderIndex() == null ? Integer.MAX_VALUE : n.getOrderIndex())
                        .thenComparing(LectureNote::getId))
                .map(n -> new LectureNoteDto(n.getId(), n.getName(), n.getNoteUrl(), n.getKeyUrl()))
                .toList();

        List<QuizSummaryDto> quizzes = lecture.getQuizzes().stream()
                .filter(Quiz::isPublished) // keep unpublished hidden by default
                .map(q -> new QuizSummaryDto(q.getId(), lecture.getId(), q.getTitle(), q.getDescription()))
                .toList();

        LectureDetailDto dto = new LectureDetailDto(
                lecture.getId(),
                lecture.getTitle(),
                videos,
                notes,
                quizzes
        );

        return ResponseEntity.ok(dto);
    }
}
