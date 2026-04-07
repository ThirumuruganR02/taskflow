import { toDateTimeLocal } from "../utils/format";

const defaultForm = {
  title: "",
  description: "",
  status: "PENDING",
  dueDate: "",
};

export default function TaskForm({
  form,
  setForm,
  onSubmit,
  isEditing,
  onCancelEdit,
  loading,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const safeDueDate = form.dueDate ? toDateTimeLocal(form.dueDate) : "";

  return (
    <form className="panel form-panel" onSubmit={onSubmit}>
      <div className="panel-header">
        <div>
          <h2>{isEditing ? "Edit task" : "Create task"}</h2>
          <p className="panel-subtitle">
            {isEditing
              ? "Update the selected task details."
              : "Add a new task to your workflow."}
          </p>
        </div>

        {isEditing && (
          <button type="button" className="ghost-btn" onClick={onCancelEdit}>
            Cancel edit
          </button>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          maxLength={150}
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          maxLength={1000}
        />
      </div>

      <div className="grid-2">
        <div className="field-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="datetime-local"
            name="dueDate"
            value={safeDueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="primary-btn" disabled={loading}>
        {loading ? "Saving..." : isEditing ? "Update task" : "Add task"}
      </button>
    </form>
  );
}

export { defaultForm };