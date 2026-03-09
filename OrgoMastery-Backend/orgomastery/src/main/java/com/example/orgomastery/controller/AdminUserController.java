package com.example.orgomastery.controller;

import com.example.orgomastery.dto.UserAdminDto;
import com.example.orgomastery.dto.UserRoleUpdateRequest;
import com.example.orgomastery.model.Role;
import com.example.orgomastery.model.User;
import com.example.orgomastery.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<UserAdminDto>> getAllUsers() {
        List<UserAdminDto> users = userRepository.findAll().stream()
                .sorted(Comparator.comparing(User::getId))
                .map(user -> new UserAdminDto(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name()
                ))
                .toList();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateUserRole(
            @PathVariable Long id,
            @Valid @RequestBody UserRoleUpdateRequest request
    ) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Prevent changing to null and allow only app roles
        Role newRole = request.getRole();
        user.setRole(newRole);

        User saved = userRepository.save(user);

        return ResponseEntity.ok(new UserAdminDto(
                saved.getId(),
                saved.getUsername(),
                saved.getEmail(),
                saved.getRole().name()
        ));
    }
}
