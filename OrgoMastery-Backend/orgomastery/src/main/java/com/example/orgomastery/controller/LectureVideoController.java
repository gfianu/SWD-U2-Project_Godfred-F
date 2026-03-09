package com.example.orgomastery.controller;

import com.example.orgomastery.dto.LectureVideoCreateRequest;
import com.example.orgomastery.dto.LectureVideoDto;
import com.example.orgomastery.dto.LectureVideoUpdateRequest;
import com.example.orgomastery.model.Lecture;
import com.example.orgomastery.model.LectureVideo;
import com.example.orgomastery.repository.LectureRepository;
import com.example.orgomastery.repository.LectureVideoRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:5173")
public class LectureVideoController {

    private final LectureVideoRepository lectureVideoRepository;
    private final LectureRepository lectureRepository;

    public LectureVideoController(
            LectureVideoRepository lectureVideoRepository,
            LectureRepository lectureRepository
    ) {
        this.lectureVideoRepository = lectureVideoRepository;
        this.lectureRepository = lectureRepository;
    }

    @PostMapping
    public ResponseEntity<?> createVideo(@Valid @RequestBody LectureVideoCreateRequest request) {
        Lecture lecture = lectureRepository.findById(request.getLectureId()).orElse(null);
        if (lecture == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lecture not found");
        }

        LectureVideo video = new LectureVideo();
        video.setLecture(lecture);
        video.setName(request.getName().trim());
        video.setUrl(request.getUrl().trim());
        video.setOrderIndex(request.getOrderIndex());

        LectureVideo saved = lectureVideoRepository.save(video);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new LectureVideoDto(saved.getId(), saved.getName(), saved.getUrl()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideo(
            @PathVariable Long id,
            @Valid @RequestBody LectureVideoUpdateRequest request
    ) {
        LectureVideo video = lectureVideoRepository.findById(id).orElse(null);
        if (video == null) {
            return ResponseEntity.notFound().build();
        }

        video.setName(request.getName().trim());
        video.setUrl(request.getUrl().trim());
        video.setOrderIndex(request.getOrderIndex());

        LectureVideo saved = lectureVideoRepository.save(video);

        return ResponseEntity.ok(new LectureVideoDto(saved.getId(), saved.getName(), saved.getUrl()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) {
        LectureVideo video = lectureVideoRepository.findById(id).orElse(null);
        if (video == null) {
            return ResponseEntity.notFound().build();
        }

        lectureVideoRepository.delete(video);
        return ResponseEntity.noContent().build();
    }
}
