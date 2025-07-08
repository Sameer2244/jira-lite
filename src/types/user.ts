export interface UserType {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
}
export interface UserContextType {
  userData: UserType | null;
  handleSetUserData: (user: UserType) => void;
}
