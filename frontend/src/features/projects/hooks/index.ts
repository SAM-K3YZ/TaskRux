// Projects hooks — TODO: implement with projectsApi once backend is live
//
// export function useProjects(token: string) {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(false);
//
//   useEffect(() => {
//     setLoading(true);
//     projectsApi.list(token)
//       .then(setProjects)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [token]);
//
//   return { projects, loading };
// }

export {};
