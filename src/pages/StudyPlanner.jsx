import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

function StudyPlanner() {
  const [tasks, setTasks] = useState([]);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [studyDate, setStudyDate] = useState("");
  const [priority, setPriority] = useState("");
  const [hours, setHours] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("study_tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setTasks(data);
    }
  }

  async function addTask(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("study_tasks").insert({
      user_id: user.id,
      subject,
      topic,
      study_date: studyDate,
      priority,
      hours,
      status: "Pending",
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Task Added Successfully");

    setSubject("");
    setTopic("");
    setStudyDate("");
    setPriority("");
    setHours("");

    fetchTasks();
  }

  async function deleteTask(id) {
    const { error } = await supabase
      .from("study_tasks")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Task Deleted");
    fetchTasks();
  }

  async function markCompleted(id) {
    const { error } = await supabase
      .from("study_tasks")
      .update({ status: "Completed" })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Task Completed");
    fetchTasks();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Study Planner</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          type="date"
          value={studyDate}
          onChange={(e) => setStudyDate(e.target.value)}
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <br />
        <br />

        <input
          type="number"
          placeholder="Study Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{task.subject}</h3>
            <p>Topic: {task.topic}</p>
            <p>Date: {task.study_date}</p>
            <p>Priority: {task.priority}</p>
            <p>Hours: {task.hours}</p>
            <p>Status: {task.status}</p>

            <button onClick={() => markCompleted(task.id)}>
              Complete
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default StudyPlanner;