"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function TasksList({
  setTasks,
}: {
  setTasks: (task: string[]) => void;
}) {
  const [tasks, setLocaleTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  function addNewTask() {
    if (!newTask) return;
    setLocaleTasks([...tasks, newTask]);
    setTasks([...tasks, newTask]);
    setNewTask("");
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewTask();
    }
  };

  const onChangeTask = (index: number, value: string) => {
    const tasksCopy = [...tasks];
    tasksCopy[index] = value;
    setLocaleTasks(tasksCopy);
    setTasks(tasksCopy);
  };

  const onDeleteTask = (index: number) => {
    const tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    setLocaleTasks(tasksCopy);
    setTasks(tasksCopy);
  };

  return (
    <div>
      <div>
        <h4 className="mb-2">
          <strong>Tareas</strong>
        </h4>
      </div>
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {tasks.map((task, index) => (
            <li className="flex gap-2" key={index}>
              <Input
                value={task}
                onChange={(event) => onChangeTask(index, event.target.value)}
              />
              <Button
                className="cursor-pointer"
                onClick={() => onDeleteTask(index)}
              >
                X
              </Button>
            </li>
          ))}
        </ul>
        <div>
          <Input
            placeholder="Maquetado de vista..."
            onKeyDown={handleKeyDown}
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
