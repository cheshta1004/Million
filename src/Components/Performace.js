import React from 'react';

const Performance = ({ task, percentage }) => {
  return (
    <div style={{ 
      backgroundColor: '#f0f0f0',
      padding: '10px',
      margin: '5px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>{task}</div>
      <div>{percentage}%</div>
    </div>
  );
};

export default Performance;



// export default function Performance({task,percentage}){
// return<>
//     <div>
//         {task} {percentage}
//     </div>
// </>
// }