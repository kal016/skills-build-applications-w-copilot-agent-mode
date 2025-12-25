import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched Workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);
  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4 text-danger">Workouts</h2>
          {workouts.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    {Object.keys(workouts[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, idx) => (
                    <tr key={idx}>
                      {Object.values(workout).map((value, i) => (
                        <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No workouts found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Workouts;
