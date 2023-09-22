import { useEffect, useState } from "react";
import axios from "../providers/axios";
import { User } from "../entities/User";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API request to fetch the list of users (replace with your API endpoint)
    axios
      .get("/users") // Replace with your actual API endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return { users, loading };
};

export default useUsers;
