import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);
  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4 text-warning">Users</h2>
          {users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    {Object.keys(users[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      {Object.values(user).map((value, i) => (
                        <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Users;
