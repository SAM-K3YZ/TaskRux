// Auth hooks — call authApi and manage loading/error state
// TODO: implement once authApi is connected

// Example:
// export function useLogin() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   const login = async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       const { token, user } = await authApi.login({ email, password });
//       useAuthStore.getState().setToken(token);
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return { login, loading, error };
// }

export {};
