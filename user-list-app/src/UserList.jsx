import { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setListOfUsers(response.data);
      } catch (err) {
        setError("Something went wrong while loading the users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // show a message while the request is running
  if (loading) {
    return <p>Loading users...</p>;
  }

  // show an error message if the request failed
  if (error) {
    return <p className="error">{error}</p>;
  }

  // keep only the users whose name contains the search text
  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // open the details of a user, or close them if already open
  const handleClick = (user) => {
    if (selectedUser && selectedUser.id === user.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div className="container">
      <h1>User List</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.map((user) => (
        <div key={user.id} className="card" onClick={() => handleClick(user)}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.company.name}</p>

          {selectedUser && selectedUser.id === user.id && (
            <div className="details">
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              <p>
                Address: {user.address.street}, {user.address.city}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserList;
