import React, { useState } from "react";

function Row({ item, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    if (description.trim() === "") {
      alert("Task description cannot be empty.");
      return;
    }
    updateTask(item.id, description);
    setIsEditing(false);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <input
          type="text"
          className="form-control me-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <span>{item.description}</span>
      )}
      <div className="btn-group">
        {isEditing ? (
          <>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={() => {
                setDescription(item.description);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteTask(item.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default Row;
