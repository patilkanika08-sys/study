import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAnalytics();
  }, []);

  async function getAnalytics() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: tasks } = await supabase
      .from("study_tasks")
      .select("*")
      .eq("user_id", user.id);

    const completed =
      tasks?.filter((t) => t.status === "Completed").length || 0;

    const pending =
      tasks?.filter((t) => t.status !== "Completed").length || 0;

    setData([
      { name: "Completed", value: completed },
      { name: "Pending", value: pending },
    ]);
  }

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Study Analytics</h1>

      <PieChart width={450} height={350}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Analytics;