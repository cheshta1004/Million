import React, { useState } from 'react';
import Tasks from './Tasks';
import Popup from './Popup';
import Button from 'react-bootstrap/Button';
import Performance from './Performace';
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTasks, setDateTasks] = useState({});

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const calculateTaskPercentages = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const taskOccurrences = {};

    Object.keys(dateTasks).forEach(date => {
      const dateObj = new Date(date);
      if (dateObj.getMonth() === currentDate.getMonth() && dateObj.getFullYear() === currentDate.getFullYear()) {
        dateTasks[date].forEach(task => {
          if (taskOccurrences[task.name]) {
            taskOccurrences[task.name]++;
          } else {
            taskOccurrences[task.name] = 1;
          }
        });
      }
    });

    const taskPercentages = {};
    Object.keys(taskOccurrences).forEach(task => {
      taskPercentages[task] = ((taskOccurrences[task] / daysInMonth) * 100).toFixed(2);
    });

    return taskPercentages;
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    let calendar = [];

    // Adding empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Adding cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tasks = dateTasks[date.toDateString()];
      const taskCount = tasks ? tasks.length : 0;
      const cellStyle = taskCount > 0 ? { border: '1px solid #ccc' } : {};

      calendar.push(
        <div
          key={`day-${day}`}
          className="calendar-day"
          style={cellStyle}
          onClick={() => setSelectedDate(date)}
        >
          <span>{day}</span>
          <div className="task-indicators">
            {tasks && tasks.map((task, index) => (
              <div key={index} className="task-indicator" style={{ backgroundColor: task.color }}></div>
            ))}
          </div>
          {taskCount > 0 && (
            <Button variant="outline-danger" style={{ fontSize: '0.55rem', padding: '0.3rem 0.3rem' }} onClick={(e) => handleRemoveTask(e, date)}>X</Button>
          )}
        </div>
      );
    }

    return calendar;
  };

  const handleTaskSelect = (task) => {
    setDateTasks(prev => ({
      ...prev,
      [selectedDate.toDateString()]: prev[selectedDate.toDateString()] 
        ? [...prev[selectedDate.toDateString()], task] 
        : [task]
    }));
    setSelectedDate(null);
  };

  const handleRemoveTask = (e, date) => {
    e.stopPropagation(); // Prevents click on button from triggering calendar day selection
    setDateTasks(prev => {
      const updatedTasks = { ...prev };
      delete updatedTasks[date.toDateString()];
      return updatedTasks;
    });
  };

  return (
    <div className="app-container">
      <div className="calendar-container">
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={() => setCurrentDate(prevMonth(currentDate))}>&lt;</button>
            <span>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</span>
            <button onClick={() => setCurrentDate(nextMonth(currentDate))}>&gt;</button>
          </div>
          <div className="calendar-grid">
            {generateCalendar()}
          </div>
        </div>
        <div className="task-percentages">
          {Object.entries(calculateTaskPercentages()).map(([task, percentage]) => (
            <Performance style={{
              position:'absolute',
              left:'10px'
            }}task={task}percentage={percentage}/>
          ))}
        </div>
      </div>
      {selectedDate && (
        <Popup
          tasks={Tasks}
          selectedDate={selectedDate}
          onSelectTask={handleTaskSelect}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

// Helper functions to navigate months
const prevMonth = (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1);
const nextMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);
const getMonthName = (month) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
};

export default Calendar;




// import React, { useState } from 'react';
// import Tasks from './Tasks';
// import Popup from './Popup';
// import Button from 'react-bootstrap/Button';

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [dateTasks, setDateTasks] = useState({});

//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (year, month) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const calculateTaskPercentage = () => {
//     const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//     const taskDays = Object.keys(dateTasks).filter(date => {
//       const dateObj = new Date(date);
//       return dateObj.getMonth() === currentDate.getMonth() && dateObj.getFullYear() === currentDate.getFullYear();
//     }).length;
//     return ((taskDays / daysInMonth) * 100).toFixed(2);
//   };

//   const generateCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//     const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

//     let calendar = [];

//     // Adding empty cells for the days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       calendar.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }

//     // Adding cells for each day of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//       const tasks = dateTasks[date.toDateString()];
//       const taskCount = tasks ? tasks.length : 0;
//       const cellStyle = taskCount > 0 ? { border: '1px solid #ccc' } : {};

//       calendar.push(
//         <div
//           key={`day-${day}`}
//           className="calendar-day"
//           style={cellStyle}
//           onClick={() => setSelectedDate(date)}
//         >
//           <span>{day}</span>
//           <div className="task-indicators">
//             {tasks && tasks.map((task, index) => (
//               <div key={index} className="task-indicator" style={{ backgroundColor: task.color }}></div>
//             ))}
//           </div>
//           {taskCount > 0 && (
//             <Button variant="outline-danger" style={{ fontSize: '0.55rem', padding: '0.3rem 0.3rem' }} onClick={(e) => handleRemoveTask(e, date)}>X</Button>
//           )}
//         </div>
//       );
//     }

//     return calendar;
//   };

//   const handleTaskSelect = (task) => {
//     setDateTasks(prev => ({
//       ...prev,
//       [selectedDate.toDateString()]: prev[selectedDate.toDateString()] 
//         ? [...prev[selectedDate.toDateString()], task] 
//         : [task]
//     }));
//     setSelectedDate(null);
//   };

//   const handleRemoveTask = (e, date) => {
//     e.stopPropagation(); // Prevents click on button from triggering calendar day selection
//     setDateTasks(prev => {
//       const updatedTasks = { ...prev };
//       delete updatedTasks[date.toDateString()];
//       return updatedTasks;
//     });
//   };

//   return (
//     <div className="app-container">
//       <div className="calendar-container">
//         <div className="calendar">
//           <div className="calendar-header">
//             <button onClick={() => setCurrentDate(prevMonth(currentDate))}>&lt;</button>
//             <span>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</span>
//             <button onClick={() => setCurrentDate(nextMonth(currentDate))}>&gt;</button>
//           </div>
//           <div className="calendar-grid">
//             {generateCalendar()}
//           </div>
//         </div>
//         <div className="task-percentage">
//           Task performed {calculateTaskPercentage()}% of the days this month
//         </div>
//       </div>
//       {selectedDate && (
//         <Popup
//           tasks={Tasks}
//           selectedDate={selectedDate}
//           onSelectTask={handleTaskSelect}
//           onClose={() => setSelectedDate(null)}
//         />
//       )}
//     </div>
//   );
// };

// // Helper functions to navigate months
// const prevMonth = (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1);
// const nextMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);
// const getMonthName = (month) => {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   return months[month];
// };

// export default Calendar;







// import React, { useState } from 'react';
// import Tasks from './Tasks';
// import Popup from './Popup';
// import Button from 'react-bootstrap/Button';

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [dateTasks, setDateTasks] = useState({});

//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (year, month) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const generateCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//     const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

//     let calendar = [];

//     // Adding empty cells for the days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       calendar.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }

//     // Adding cells for each day of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//       const tasks = dateTasks[date.toDateString()];
//       const taskCount = tasks ? tasks.length : 0;
//       const cellStyle = taskCount > 0 ? { border: '1px solid #ccc' } : {};

//       calendar.push(
//         <div
//           key={`day-${day}`}
//           className="calendar-day"
//           style={cellStyle}
//           onClick={() => setSelectedDate(date)}
//         >
//           <span>{day}</span>
//           <div className="task-indicators">
//             {tasks && tasks.map((task, index) => (
//               <div key={index} className="task-indicator" style={{ backgroundColor: task.color }}></div>
//             ))}
//           </div>
//           {taskCount > 0 && (
//             <Button variant="outline-danger" style={{ fontSize: '0.55rem', padding: '0.3rem 0.3rem' }} onClick={(e) => handleRemoveTask(e, date)}>X</Button>

//           )}
//         </div>
//       );
//     }

//     return calendar;
//   };

//   const handleTaskSelect = (task) => {
//     setDateTasks(prev => ({
//       ...prev,
//       [selectedDate.toDateString()]: prev[selectedDate.toDateString()] 
//         ? [...prev[selectedDate.toDateString()], task] 
//         : [task]
//     }));
//     setSelectedDate(null);
//   };

//   const handleRemoveTask = (e, date) => {
//     e.stopPropagation(); // Prevents click on button from triggering calendar day selection
//     setDateTasks(prev => {
//       const updatedTasks = { ...prev };
//       delete updatedTasks[date.toDateString()];
//       return updatedTasks;
//     });
//   };

//   return (
//     <div className="app-container">
//       <div className="calendar-container">
//         <div className="calendar">
//           <div className="calendar-header">
//             <button onClick={() => setCurrentDate(prevMonth(currentDate))}>&lt;</button>
//             <span>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</span>
//             <button onClick={() => setCurrentDate(nextMonth(currentDate))}>&gt;</button>
//           </div>
//           <div className="calendar-grid">
//             {generateCalendar()}
//           </div>
//         </div>
//       </div>
//       {selectedDate && (
//         <Popup
//           tasks={Tasks}
//           selectedDate={selectedDate}
//           onSelectTask={handleTaskSelect}
//           onClose={() => setSelectedDate(null)}
//         />
//       )}
//     </div>
//   );
// };

// // Helper functions to navigate months
// const prevMonth = (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1);
// const nextMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);
// const getMonthName = (month) => {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   return months[month];
// };

// export default Calendar;




