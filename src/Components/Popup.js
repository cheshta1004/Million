import React,{useContext} from 'react';
import UserContext from 'C:/Users/chesh/OneDrive/Desktop/Million/src/Components/Context.js';

const Popup = ({ tasks, selectedDate, onSelectTask, onClose }) => {
  const { Task } = useContext(UserContext);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Select a Task for {selectedDate.toDateString()}</h2>
        <ul>
          {Task.map(Task => (
            <li key={Task.name} onClick={() => onSelectTask(Task)} style={{ cursor: 'pointer' }}>
              {Task.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;

