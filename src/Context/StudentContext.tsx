import { createContext, PropsWithChildren, useState } from "react";
import client from "../api";
import { Student, Students } from "../types/students";

type StudentContextProps = {
  isLoading: boolean;
  users: Students;
  fetch: () => Promise<void>;
  save: (student: Student) => Promise<void>;
};

const StudentContext = createContext<StudentContextProps>({} as StudentContextProps);

const StudentProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState<Students>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    setIsLoading(true);
    try {
      const { data } = await client.get<Students>("/students");
      setUsers(data);
    } finally {
      setIsLoading(false);
    }
  };

  const save = async (student: Student) => {
    await client.post("/students", {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    });
    setUsers(prev => [...prev, student]);
  };

  return (
    <StudentContext.Provider value={{ isLoading, users, fetch, save }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
