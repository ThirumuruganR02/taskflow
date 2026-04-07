export default function TaskToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onSearch,
  onFilter,
  onReset,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="panel toolbar">
      <div className="toolbar-group toolbar-search">
        <input
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="toolbar-group toolbar-filter">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="toolbar-actions">
        <button type="button" className="primary-btn" onClick={onSearch}>
          Search
        </button>
        <button type="button" className="secondary-btn" onClick={onFilter}>
          Filter
        </button>
        <button type="button" className="ghost-btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}