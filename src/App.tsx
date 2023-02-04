import React, { useEffect } from "react";
import useUserStore from "./modules/userTable/store";

function App() {
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onBtnClick = () => {
    addUser("newUser");
  };

  return (
    <div className="App">
      {users.map((user) => (
        <div key={user.id}>
          {user.id}.{user.username}
        </div>
      ))}
      <button onClick={onBtnClick}>Create</button>
    </div>
  );
}

export default App;
