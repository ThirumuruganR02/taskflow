import { useEffect, useMemo, useState } from "react";
import client from "../api/client";

const defaultForm = {
  title: "",
  description: "",
  status: "PENDING",
  dueDate: "",
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");
      const { data } = await client.get("/api/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Could not load tasks.");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDateTime = (date) => {
    if (!date) return null;
    return date.length === 10 ? `${date}T00:00:00` : date;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        dueDate: formatDateTime(form.dueDate),
      };

      if (editingId) {
        await client.put(`/api/tasks/${editingId}`, payload);
      } else {
        await client.post("/api/tasks", payload);
      }

      setForm(defaultForm);
      setEditingId(null);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to save task.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "PENDING",
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await client.delete(`/api/tasks/${id}`);
      if (editingId === id) {
        setEditingId(null);
        setForm(defaultForm);
      }
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to delete task.");
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await client.get("/api/tasks/search", {
        params: { keyword: search },
      });
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Search failed.");
    }
  };

  const handleFilter = async () => {
    if (!status) {
      fetchTasks();
      return;
    }

    try {
      const { data } = await client.get("/api/tasks/filter", {
        params: { status },
      });
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Filter failed.");
    }
  };

  const handleReset = () => {
    setSearch("");
    setStatus("");
    fetchTasks();
  };

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "PENDING").length,
      progress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
      completed: tasks.filter((t) => t.status === "COMPLETED").length,
    };
  }, [tasks]);

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>TaskFlow Dashboard</h1>
      <p>Total: {stats.total}</p>
      <p>Pending: {stats.pending}</p>
      <p>In Progress: {stats.progress}</p>
      <p>Completed: {stats.completed}</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ display: "block", marginBottom: "10px", width: "300px", height: "80px" }}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        >
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Task" : "Add Task"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(defaultForm);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Search</button>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <option value="">All</option>
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>

      {pageLoading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "16px" }}>
              <strong>{task.title}</strong> - {task.status}
              <br />
              {task.description}
              <br />
              Due: {task.dueDate || "No due date"}
              <br />
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}