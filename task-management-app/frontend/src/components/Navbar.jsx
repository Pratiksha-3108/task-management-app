import React from 'react';

export default function Navbar({ totalTasks, completedTasks }) {
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <nav className="border-bottom py-3 mb-4 rounded-b-lg" 
         style={{ 
           backgroundColor: '#121214', 
           borderColor: '#1f2937',
         }}>
      <div className="container d-flex align-items-center justify-content-between">
        <a className="d-flex align-items-center gap-2" href="#" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700, letterSpacing: '-0.025em' }}>
          <div className="rounded d-flex align-items-center justify-content-center text-white" 
               style={{ 
                 width: '32px', 
                 height: '32px', 
                 backgroundColor: '#4f46e5', 
                 fontWeight: 'bold', 
                 fontSize: '16px' 
               }}>
            T
          </div>
          <span style={{ fontSize: '1.2rem' }}>
            TaskFlow <span className="text-secondary font-monospace" style={{ fontSize: '11px', color: '#818cf8' }}>v1.0.4</span>
          </span>
        </a>
        
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex flex-column align-items-end text-end text-nowrap">
            <span className="text-muted uppercase tracking-widest font-monospace" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}>Project Progress</span>
            <span className="text-sm font-bold text-white">
              {completedTasks}/{totalTasks} Tasks <span style={{ color: '#818cf8' }}>({percentage}%)</span>
            </span>
          </div>
          <div className="progress d-none d-sm-block" style={{ height: '8px', width: '128px', backgroundColor: '#1c1c1f' }}>
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: '#4f46e5',
                transition: 'width 0.5s ease'
              }} 
              aria-valuenow={percentage} 
              aria-valuemin="0" 
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
