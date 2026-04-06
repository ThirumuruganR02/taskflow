package backend.service;

import backend.dto.request.TaskRequest;
import backend.dto.response.TaskResponse;
import backend.entity.Task;
import backend.entity.User;
import backend.enums.TaskStatus;
import backend.repository.TaskRepository;
import backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;

    public TaskResponse createTask(TaskRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.PENDING)
                .dueDate(request.getDueDate())
                .user(user)
                .build();
        Task saved = taskRepository.save(task);
        activityLogService.log("Created task: " + task.getTitle(), "TASK", saved.getId(), userEmail);
        return mapToResponse(saved);
    }

    public TaskResponse updateTask(Long taskId, TaskRequest request, String userEmail) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized to update this task");
        }
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        Task updated = taskRepository.save(task);
        activityLogService.log("Updated task: " + task.getTitle(), "TASK", taskId, userEmail);
        return mapToResponse(updated);
    }

    public void deleteTask(Long taskId, String userEmail) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized to delete this task");
        }
        activityLogService.log("Deleted task: " + task.getTitle(), "TASK", taskId, userEmail);
        taskRepository.delete(task);
    }

    public List<TaskResponse> getUserTasks(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByUserId(user.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> filterByStatus(String userEmail, TaskStatus status) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByUserIdAndStatus(user.getId(), status)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> searchTasks(String userEmail, String keyword) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.searchTasks(user.getId(), keyword)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .dueDate(task.getDueDate())
                .username(task.getUser().getUsername())
                .build();
    }
}