package com.example.orgomastery.controller;

import com.example.orgomastery.dto.*;
import com.example.orgomastery.model.Lecture;
import com.example.orgomastery.model.LectureNote;
import com.example.orgomastery.model.LectureVideo;
import com.example.orgomastery.model.Quiz;
import com.example.orgomastery.repository.LectureRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/lectures")
@CrossOrigin(origins = "http://localhost:5173")
public class LectureController {

    private final LectureRepository lectureRepository;

    public LectureController(LectureRepository lectureRepository) {
        this.lectureRepository = lectureRepository;
    }

    @GetMapping
    public ResponseEntity<List<LectureSummaryDto>> getAllLectures() {
        List<LectureSummaryDto> lectures = lectureRepository.findAllByOrderByOrderIndexAscIdAsc()
                .stream()
                .map(l -> new LectureSummaryDto(l.getId(), l.getTitle()))
                .toList();

        return ResponseEntity.ok(lectures);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<LectureDetailDto> getLectureById(@PathVariable Long id) {
        Lecture lecture = lectureRepository.findById(id).orElse(null);
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
                .sorted(Comparator.comparing(Quiz::getId))
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

    @PostMapping
    public ResponseEntity<LectureSummaryDto> createLecture(
            @Valid @RequestBody LectureCreateRequest request
    ) {
        Lecture lecture = new Lecture();
        lecture.setTitle(request.getTitle().trim());
        lecture.setOrderIndex(request.getOrderIndex());

        Lecture saved = lectureRepository.save(lecture);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new LectureSummaryDto(saved.getId(), saved.getTitle()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLecture(
            @PathVariable Long id,
            @Valid @RequestBody LectureUpdateRequest request
    ) {
        Lecture lecture = lectureRepository.findById(id).orElse(null);
        if (lecture == null) {
            return ResponseEntity.notFound().build();
        }

        lecture.setTitle(request.getTitle().trim());
        lecture.setOrderIndex(request.getOrderIndex());

        Lecture saved = lectureRepository.save(lecture);

        return ResponseEntity.ok(new LectureSummaryDto(saved.getId(), saved.getTitle()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLecture(@PathVariable Long id) {
        Lecture lecture = lectureRepository.findById(id).orElse(null);
        if (lecture == null) {
            return ResponseEntity.notFound().build();
        }

        lectureRepository.delete(lecture);
        return ResponseEntity.noContent().build();
    }
}

