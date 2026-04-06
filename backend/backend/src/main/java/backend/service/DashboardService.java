package backend.service;

import backend.dto.response.DashboardResponse;
import backend.entity.User;
import backend.enums.TaskStatus;
import backend.repository.TaskRepository;
import backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public DashboardResponse getDashboard(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        long total = taskRepository.countByUserId(user.getId());
        long pending = taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.PENDING);
        long inProgress = taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.IN_PROGRESS);
        long completed = taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.COMPLETED);
        return DashboardResponse.builder()
                .totalTasks(total)
                .pendingTasks(pending)
                .inProgressTasks(inProgress)
                .completedTasks(completed)
                .mostProductiveDay("Keep logging tasks to see insights!")
                .build();
    }
}