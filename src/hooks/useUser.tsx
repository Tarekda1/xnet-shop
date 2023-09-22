import { useEffect, useState } from "react";
import axios from "../providers/axios";
import { User } from "../entities/User";

const useUser = (id: string) => {
  const [user, setUser] = useState<User>({ _id: "", username: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API request to fetch the list of users (replace with your API endpoint)
    axios
      .get(`/users/${id}`) // Replace with your actual API endpoint
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [id]);

  return { user, loading };
};

export default useUser;
