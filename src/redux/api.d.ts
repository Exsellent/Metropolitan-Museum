declare module "../api" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface User {
    id: number;
    name: string;
    email: string;
  }

  function login(username: string, password: string): Promise<User>;

  export default login;
}
