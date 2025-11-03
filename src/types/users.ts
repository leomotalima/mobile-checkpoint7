type User = {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  username?: string;
  address?: string;
  password?: string;
  avatar?: string;
  gender?: string;
};

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Students = Student[];

export type { User, Student, Students };
