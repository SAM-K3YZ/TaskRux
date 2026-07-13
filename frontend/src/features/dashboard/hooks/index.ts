// Dashboard hooks — TODO: implement with dashboardApi once backend is live
//
// export function useDashboardStats(token: string) {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [loading, setLoading] = useState(false);
//
//   useEffect(() => {
//     setLoading(true);
//     dashboardApi.getStats(token)
//       .then(setStats)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [token]);
//
//   return { stats, loading };
// }

export {};
