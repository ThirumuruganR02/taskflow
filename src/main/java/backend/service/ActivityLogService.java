package backend.service;

import backend.entity.ActivityLog;
import backend.entity.User;
import backend.repository.ActivityLogRepository;
import backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;

    public void log(String action, String entityType, Long entityId, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        ActivityLog log = ActivityLog.builder()
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .user(user)
                .build();
        activityLogRepository.save(log);
    }

    public List<ActivityLog> getUserLogs(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return activityLogRepository.findByUserIdOrderByPerformedAtDesc(user.getId());
    }

    public List<ActivityLog> getAllLogs() {
        return activityLogRepository.findAllByOrderByPerformedAtDesc();
    }
}