// Tasks hooks — TODO: implement with tasksApi once backend is live
//
// export function useTasks(projectId: string, token: string) {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(false);
//
//   useEffect(() => {
//     setLoading(true);
//     tasksApi.list(projectId, token)
//       .then(setTasks)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [projectId, token]);
//
//   return { tasks, loading };
// }

export {};
