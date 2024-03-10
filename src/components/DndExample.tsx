"use client";

import { cardsData } from "@/bin/CardsData";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
// import LoadingSkeleton from "./LoadingSkeleton";
import { DndContext } from "@/context/DndContext";
interface Cards {
  id: number;
  title: string;
  components: {
    id: number;
    name: string;
    description?: string; // Add description property if it doesn't exist
  }[];
}

const TaskDetailsPopup: React.FC<{
  task: Cards["components"][0];
  onClose: () => void;
  onEdit: (
    taskId: number,
    editedName: string,
    editedDescription: string
  ) => void;
  onDelete: (taskId: number) => void;
}> = ({ task, onClose, onEdit, onDelete }) => {
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const handleSave = () => {
    onEdit(task.id, editedName, editedDescription);
    onClose();
  };

  return (
    <div className="task-details-popup bg-white text-black w-1/4 mx-auto p-3 rounded-md">
      <h2 className="text-center">{`Task Name - ${editedName} / Task id -${task.id}`}</h2>

      <hr />

      <div className="p-3">
        <div className="my-2 flex gap-2  justify-between">
          <label>Name:</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="border-2 rounded-md text-center text-gray-400"
          />
        </div>
        <div className="my-2 flex justify-between gap-2 items-center">
          <label>Description:</label>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border-2 rounded-md "
          />
        </div>
      </div>

      <hr />
      <div className="flex justify-evenly mt-2">
        <button
          className="bg-gradient-to-l from-lime-400 to-green-300 p-1 rounded-lg"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <button
          className="bg-gradient-to-l from-rose-400 to-rose-600 p-1 rounded-lg"
          onClick={() => onDelete(task.id)}
        >
          Delete Task
        </button>
        <button
          className="bg-gradient-to-r from-neutral-300 to-stone-400 p-1 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const DndExample = () => {
  const [data, setData] = useState<Cards[] | []>([]);
  const [selectedTask, setSelectedTask] = useState<
    Cards["components"][0] | null
  >(null);

  // Function to save data to local storage
  const saveDataToLocalStorage = (data: Cards[] | []) => {
    localStorage.setItem("dndData", JSON.stringify(data));
  };

  // Function to get data from local storage
  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("dndData");
    return storedData ? JSON.parse(storedData) : [];
  };

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedData = getDataFromLocalStorage();
    setData(storedData.length ? storedData : []); // Remove the default assignment to cardsData
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))];
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
      saveDataToLocalStorage(newData); // Move this line inside the if block
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))];
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
      saveDataToLocalStorage(newData); // Move this line inside the else block
    }
  };

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedData = getDataFromLocalStorage();
    setData(storedData.length ? storedData : cardsData);
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {}, []);

  //   if (!data.length) {
  //     return <LoadingSkeleton />;
  //   }

  const handleAddTask = async (containerIndex: number) => {
    const newData = [...JSON.parse(JSON.stringify(data))];

    const taskTitle = prompt("Enter the task title:");

    if (taskTitle) {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        name: taskTitle,
      };

      newData[containerIndex].components.push(newTask);
      setData([...newData]);
    }
    saveDataToLocalStorage(newData);
  };

  const handleTaskClick = (task: Cards["components"][0]) => {
    setSelectedTask(task);
  };

  const handleEditTask = (
    taskId: number,
    editedName: string,
    editedDescription: string
  ) => {
    const newData = data.map((group) => ({
      ...group,
      components: group.components.map((task) =>
        task.id === taskId
          ? { ...task, name: editedName, description: editedDescription }
          : task
      ),
    }));
    setData(newData);
    saveDataToLocalStorage(newData);
    setSelectedTask(null); // Close the pop-up after editing
  };

  const handleDeleteTask = (taskId: number) => {
    const newData = data.map((group) => ({
      ...group,
      components: group.components.filter((task) => task.id !== taskId),
    }));
    setData(newData);
    saveDataToLocalStorage(newData);
    setSelectedTask(null); // Close the pop-up after deletion
  };

  // const handleAddTask = async (containerIndex: number) => {
  //   const newData = [...JSON.parse(JSON.stringify(data))];

  //   const taskTitle = prompt("Enter the task title:");

  //   if (taskTitle) {
  //     const newTask = {
  //       id: Math.floor(Math.random() * 1000),
  //       name: taskTitle,
  //     };

  //     newData[containerIndex].components.push(newTask);
  //     setData([...newData]);
  //     saveDataToLocalStorage(newData);
  //   }
  // };

  const handleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    containerIndex: number
  ) => {
    if (e.key === "Enter") {
      const taskTitle = e.currentTarget.value;

      if (taskTitle) {
        const newData = [...JSON.parse(JSON.stringify(data))];
        const newTask = {
          id: Math.floor(Math.random() * 1000),
          name: taskTitle,
        };

        newData[containerIndex].components.push(newTask);
        setData([...newData]);
        saveDataToLocalStorage(newData);

        // Clear the input field
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 justify-between my-3 mx-8 px-4 flex-col lg:flex-row py-3 mb-3">
        {data.map((val, index) => {
          return (
            <Droppable key={index} droppableId={`droppable${index}`}>
              {(provided) => (
                <div
                  className="p-0.5 lg:w-1/3 w-full rounded-md bg-white text-black shadow-lg shadow-gray-600  border-black bottom-2 border "
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="cardnav flex justify-between text-white bg-gradient-to-l from-gray-900 via-gray-800 to-gray-800 p-2 m-1 ">
                    <div className="left flex gap-2 justify-center">
                      <p className="rounded-md">{val.title}</p>
                      <p className="bg-red-300 p-1 rounded-full text-xs justify-center">
                        {val.components.length}
                      </p>
                    </div>
                    <div className="right flex justify-center gap-2">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                          />
                        </svg>
                      </p>
                      <p
                        className="AddButton"
                        onClick={() => handleAddTask(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>

                  {val.components?.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-gradient-to-r from-neutral-300 to-stone-400 rounded-lg  mx-1 px-4 py-3 my-3"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          onClick={() => handleTaskClick(component)}
                        >
                          {component.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <div className=" rounded-sm  mx-1 px-4 py-3 my-3  justify-center">
                    <input
                      type="text"
                      placeholder="Add a task... "
                      onKeyPress={(e) => handleInputKeyPress(e, index)}
                      className="border-2 rounded-full p-2 w-full text-center"
                    />
                    
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>

      {selectedTask && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </DndContext>
  );
};

export default DndExample;
