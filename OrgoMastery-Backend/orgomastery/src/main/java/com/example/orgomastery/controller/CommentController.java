package com.example.orgomastery.controller;

import com.example.orgomastery.dto.CommentCreateRequest;
import com.example.orgomastery.dto.CommentResponse;
import com.example.orgomastery.model.Comment;
import com.example.orgomastery.model.LectureVideo;
import com.example.orgomastery.model.User;
import com.example.orgomastery.repository.CommentRepository;
import com.example.orgomastery.repository.LectureVideoRepository;
import com.example.orgomastery.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentRepository commentRepository;
    private final LectureVideoRepository lectureVideoRepository;
    private final UserRepository userRepository;

    public CommentController(
            CommentRepository commentRepository,
            LectureVideoRepository lectureVideoRepository,
            UserRepository userRepository
    ) {
        this.commentRepository = commentRepository;
        this.lectureVideoRepository = lectureVideoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/video/{videoId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByVideo(@PathVariable Long videoId) {
        List<CommentResponse> comments = commentRepository.findByVideoIdOrderByCreatedAtAsc(videoId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<?> createComment(
            @Valid @RequestBody CommentCreateRequest request,
            Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        LectureVideo video = lectureVideoRepository.findById(request.getVideoId()).orElse(null);
        if (video == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video not found");
        }

        Comment comment = new Comment(request.getText().trim(), video, user);
        Comment saved = commentRepository.save(comment);

        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found");
        }

        boolean isOwner = comment.getUser().getId().equals(currentUser.getId());
        boolean isInstructor = currentUser.getRole().name().equals("INSTRUCTOR");

        if (!isOwner && !isInstructor) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not allowed to delete this comment");
        }

        commentRepository.delete(comment);
        return ResponseEntity.noContent().build();
    }

    private CommentResponse toResponse(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getVideo().getId(),
                comment.getUser().getId(),
                comment.getUser().getUsername(),
                comment.getText(),
                comment.getUser().getRole().name(),
                comment.getCreatedAt()
        );
    }
}
