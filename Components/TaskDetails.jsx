// TaskDetails.js
import React, { useState } from "react";

const TaskDetails = ({ taskId, title, status, description, onClose, onDelete, onUpdate }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedStatus, setEditedStatus] = useState(status);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleUpdate = () => {
    // Implement your update logic here
    onUpdate(taskId, editedTitle, editedStatus, editedDescription);
    onClose();
  };

  return (
    <div className="task-details">
      <h2>{title}</h2>
      <p>Status: {status}</p>
      <p>Description: {description}</p>

      <input
        type="text"
        placeholder="New title"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="New status"
        value={editedStatus}
        onChange={(e) => setEditedStatus(e.target.value)}
      />
      <textarea
        placeholder="New description"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => onDelete(taskId)}>Delete</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskDetails;
