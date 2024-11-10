import { useEffect, useState } from "react";
import axios from "axios";
import Row from "../components/Row.js";
import { useUser } from "../context/useUser.js";

const url = "http://localhost:3001";

function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        alert(error.response?.data?.error || error.message);
      });
  }, []);

  const addTask = () => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .post(url + "/create", { description: task }, headers)
      .then((response) => {
        setTasks([...tasks, { id: response.data.id, description: task }]);
        setTask("");
      })
      .catch((error) => {
        alert(error.response?.data?.error || error.message);
      });
  };

  const deleteTask = (id) => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .delete(url + "/delete/" + id, headers)
      .then(() => {
        const withoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(withoutRemoved);
      })
      .catch((error) => {
        alert(error.response?.data?.error || error.message);
      });
  };

  const updateTask = (id, newDescription) => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .put(url + "/update/" + id, { description: newDescription }, headers)
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, description: newDescription } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        alert(error.response?.data?.error || error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Todos</h3>
      <form
        className="input-group mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
      <ul className="list-group">
        {tasks.map((item) => (
          <Row
            key={item.id}
            item={item}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default Home;
