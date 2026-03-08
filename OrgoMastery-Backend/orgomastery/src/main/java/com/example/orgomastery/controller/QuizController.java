package com.example.orgomastery.controller;

import com.example.orgomastery.dto.*;
import com.example.orgomastery.model.Question;
import com.example.orgomastery.model.Quiz;
import com.example.orgomastery.model.QuizAttempt;
import com.example.orgomastery.model.QuizAttemptAnswer;
import com.example.orgomastery.model.User;
import com.example.orgomastery.repository.QuestionRepository;
import com.example.orgomastery.repository.QuizAttemptRepository;
import com.example.orgomastery.repository.QuizRepository;
import com.example.orgomastery.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UserRepository userRepository;

    public QuizController(
            QuizRepository quizRepository,
            QuestionRepository questionRepository,
            QuizAttemptRepository quizAttemptRepository,
            UserRepository userRepository
    ) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{quizId}")
    @Transactional(readOnly = true)
    public ResponseEntity<QuizDetailDto> getQuiz(@PathVariable Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz == null) return ResponseEntity.notFound().build();

        List<QuestionDto> questions = quiz.getQuestions().stream()
                .sorted(Comparator
                        .comparing((Question q) -> q.getOrderIndex() == null ? Integer.MAX_VALUE : q.getOrderIndex())
                        .thenComparing(Question::getId))
                .map(q -> new QuestionDto(
                        q.getId(),
                        q.getPrompt(),
                        List.of(q.getChoiceA(), q.getChoiceB(), q.getChoiceC(), q.getChoiceD())
                ))
                .toList();

        QuizDetailDto dto = new QuizDetailDto(
                quiz.getId(),
                quiz.getLecture().getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                questions
        );

        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{quizId}/attempts")
    @Transactional
    public ResponseEntity<?> submitAttempt(
            @PathVariable Long quizId,
            @Valid @RequestBody AttemptCreateDto body,
            Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz == null) return ResponseEntity.notFound().build();

        Map<Long, Integer> selections = new HashMap<>();
        for (AttemptAnswerDto a : body.getAnswers()) {
            selections.put(a.getQuestionId(), a.getSelectedIndex());
        }

        int total = quiz.getQuestions().size();
        int score = 0;
        List<IncorrectAnswerDto> incorrect = new ArrayList<>();

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setUser(user);
        attempt.setScore(0);
        attempt.setTotal(total);

        for (Question q : quiz.getQuestions()) {
            Integer selectedIndex = selections.get(q.getId());

            String userAnswerText = (selectedIndex == null)
                    ? "No answer"
                    : optionTextByIndex(q, selectedIndex);

            String correctText = optionTextByLetter(q, q.getCorrectChoice());

            boolean isCorrect = selectedIndex != null && isCorrect(q, selectedIndex);
            if (isCorrect) {
                score++;
            } else {
                incorrect.add(new IncorrectAnswerDto(
                        q.getId(),
                        q.getPrompt(),
                        userAnswerText,
                        correctText
                ));
            }

            if (selectedIndex != null) {
                QuizAttemptAnswer answer = new QuizAttemptAnswer();
                answer.setQuestion(q);
                answer.setSelectedIndex(selectedIndex);
                answer.setCorrect(isCorrect);
                attempt.addAnswer(answer);
            }
        }

        attempt.setScore(score);
        quizAttemptRepository.save(attempt);

        AttemptResultDto result = new AttemptResultDto(quiz.getId(), score, total, incorrect);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{quizId}/attempts/latest")
    public ResponseEntity<?> getLatestAttempt(
            @PathVariable Long quizId,
            Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        return quizAttemptRepository
                .findTopByQuizIdAndUserIdOrderByCreatedAtDesc(quizId, user.getId())
                .<ResponseEntity<?>>map(attempt -> ResponseEntity.ok(
                        new LatestAttemptDto(
                                attempt.getId(),
                                attempt.getQuiz().getId(),
                                attempt.getScore(),
                                attempt.getTotal(),
                                attempt.getCreatedAt()
                        )
                ))
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/my-attempts")
    public ResponseEntity<?> getMyAttempts(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        List<QuizAttemptSummaryDto> attempts = quizAttemptRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(a -> new QuizAttemptSummaryDto(
                        a.getId(),
                        a.getQuiz().getId(),
                        a.getQuiz().getTitle(),
                        a.getQuiz().getLecture().getId(),
                        a.getQuiz().getLecture().getTitle(),
                        a.getScore(),
                        a.getTotal(),
                        a.getCreatedAt()
                ))
                .toList();

        return ResponseEntity.ok(attempts);
    }

    @GetMapping("/{quizId}/analytics")
    public ResponseEntity<?> getQuizAnalytics(
            @PathVariable Long quizId,
            Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        if (!"INSTRUCTOR".equals(currentUser.getRole().name())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Instructor access required");
        }

        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz == null) {
            return ResponseEntity.notFound().build();
        }

        List<QuizAttempt> attempts = quizAttemptRepository.findByQuizIdOrderByCreatedAtDesc(quizId);

        int attemptCount = attempts.size();

        double averageScore = attemptCount == 0
                ? 0.0
                : attempts.stream().mapToInt(QuizAttempt::getScore).average().orElse(0.0);

        double averagePercent = attemptCount == 0
                ? 0.0
                : attempts.stream()
                .mapToDouble(a -> a.getTotal() == 0 ? 0.0 : (a.getScore() * 100.0) / a.getTotal())
                .average()
                .orElse(0.0);

        Integer highestScore = attemptCount == 0
                ? 0
                : attempts.stream().map(QuizAttempt::getScore).max(Integer::compareTo).orElse(0);

        Integer lowestScore = attemptCount == 0
                ? 0
                : attempts.stream().map(QuizAttempt::getScore).min(Integer::compareTo).orElse(0);

        Map<Long, List<QuizAttempt>> attemptsByUser = attempts.stream()
                .collect(Collectors.groupingBy(a -> a.getUser().getId()));

        List<StudentAttemptStatsDto> studentStats = attemptsByUser.values().stream()
                .map(userAttempts -> {
                    userAttempts.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));

                    QuizAttempt latest = userAttempts.get(0);
                    User student = latest.getUser();

                    int bestScore = userAttempts.stream()
                            .map(QuizAttempt::getScore)
                            .max(Integer::compareTo)
                            .orElse(0);

                    return new StudentAttemptStatsDto(
                            student.getId(),
                            student.getUsername(),
                            student.getEmail(),
                            userAttempts.size(),
                            bestScore,
                            latest.getScore(),
                            latest.getTotal(),
                            latest.getCreatedAt()
                    );
                })
                .sorted((a, b) -> {
                    LocalDateTime timeA = a.getLatestAttemptAt();
                    LocalDateTime timeB = b.getLatestAttemptAt();
                    return timeB.compareTo(timeA);
                })
                .toList();

        QuizAnalyticsDto dto = new QuizAnalyticsDto(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getLecture().getId(),
                quiz.getLecture().getTitle(),
                attemptCount,
                roundTwoDecimals(averageScore),
                roundTwoDecimals(averagePercent),
                highestScore,
                lowestScore,
                studentStats
        );

        return ResponseEntity.ok(dto);
    }

    // ---------- helpers ----------
    private boolean isCorrect(Question q, int selectedIndex) {
        String correct = q.getCorrectChoice();
        int correctIndex = switch (correct) {
            case "A" -> 0;
            case "B" -> 1;
            case "C" -> 2;
            case "D" -> 3;
            default -> throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Invalid correctChoice for question " + q.getId()
            );
        };
        return selectedIndex == correctIndex;
    }

    private String optionTextByIndex(Question q, int idx) {
        return switch (idx) {
            case 0 -> q.getChoiceA();
            case 1 -> q.getChoiceB();
            case 2 -> q.getChoiceC();
            case 3 -> q.getChoiceD();
            default -> throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "selectedIndex must be 0-3"
            );
        };
    }

    private String optionTextByLetter(Question q, String letter) {
        return switch (letter) {
            case "A" -> q.getChoiceA();
            case "B" -> q.getChoiceB();
            case "C" -> q.getChoiceC();
            case "D" -> q.getChoiceD();
            default -> "Unknown";
        };
    }

    private double roundTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}

