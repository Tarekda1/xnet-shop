import { useState, useCallback } from "react";
import { User } from "../entities/User";

interface UseUserSearchProps {
  initialUsers: User[];
  searchTerm: string;
}

function useUserSearch({ initialUsers, searchTerm }: UseUserSearchProps) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);

  const searchUsers = useCallback(() => {
    if (searchTerm.length > 0) {
      console.log(initialUsers);
      const filteredProductsInner = initialUsers.filter((user) =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredProductsInner);
      return filteredProductsInner;
    } else {
      setFilteredUsers(initialUsers);
      return initialUsers;
    }
  }, [setFilteredUsers, initialUsers, searchTerm]);

  return { filteredUsers, searchUsers };
}

export default useUserSearch;
