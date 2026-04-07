import { Pencil, Trash2, CalendarClock } from "lucide-react";
import { formatDate } from "../utils/format";

export default function TaskCard({ task, onEdit, onDelete }) {
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      onDelete(task.id);
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-top">
        <div className="task-content">
          <h3 title={task.title}>{task.title}</h3>

          <p>
            {task.description && task.description.trim() !== ""
              ? task.description
              : "No description provided."}
          </p>
        </div>

        <span className={`badge ${task.status.toLowerCase()}`}>
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div className="task-meta">
        <span>
          <CalendarClock size={16} />
          {task.dueDate ? formatDate(task.dueDate) : "No due date"}
        </span>
      </div>

      <div className="task-actions">
        <button type="button" className="ghost-btn" onClick={() => onEdit(task)}>
          <Pencil size={16} />
          Edit
        </button>

        <button type="button" className="danger-btn" onClick={handleDelete}>
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}