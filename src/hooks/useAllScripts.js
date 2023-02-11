import React from "react";
import createApi from "../api";

export default function useAllScripts() {
  const api = createApi();
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (error) {
        console.log("error: ", error);
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  return { tasks, isLoading };
}
