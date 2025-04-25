// LoginPayload type represents the data you need to send to the login API
export interface LoginPayload {
    username: string;
    password: string;
  }
  
  
  // User type represents the user data returned after successful login
  export interface User {
    id: number;
    username: string;
    password: string;
  }
  

 