"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDetails from "./TaskDetails";

function Board() {
  const [columns, setColumns] = useState({
    board: {
      id: "board",
      title: "Not Started",
      cardIds: ["card1", "card2", "card3"],
    },
    container2: {
      id: "container2",
      title: "In Process",
      cardIds: ["card4", "card5", "card6"],
    },
    container3: {
      id: "container3",
      title: "Completed",
      cardIds: ["card7", "card8", "card9"],
    },
  });

  useEffect(() => {}, []);

  const addNewTask = (columnId) => {
    const columnName = columns[columnId].title;
    const taskTitle = prompt(`Enter the title for the new task in ${columnName}:`);
  
    if (taskTitle) {
      const newTaskId = `card${Object.values(columns).reduce((max, col) => Math.max(parseInt(col.cardIds[col.cardIds.length - 1].substring(4)), max), 0) + 1}`;
      const newColumns = { ...columns };
  
      newColumns[columnId].cardIds.push(newTaskId);
  
      setColumns(newColumns);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const newSourceCardIds = Array.from(sourceColumn.cardIds);
    newSourceCardIds.splice(source.index, 1);

    const newDestinationCardIds = Array.from(destinationColumn.cardIds);
    newDestinationCardIds.splice(destination.index, 0, draggableId);

    setColumns((prevColumns) => ({
      ...prevColumns,
      [source.droppableId]: {
        ...sourceColumn,
        cardIds: newSourceCardIds,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        cardIds: newDestinationCardIds,
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="w-5/6 mx-auto m-5 flex space-x-2 gap-3 justify-between p-6"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Object.values(columns).map((column, index) => (
              <Droppable key={column.id} droppableId={column.id} type="card">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className={`bg-white w-1/3 shadow-lg shadow-gray-100 container${index + 1}`}>
                    <div className="cardnav flex justify-between bg-slate-900 p-2 m-1 ">
                      <div className="left flex gap-2 justify-center">
                        <p className="rounded-md">{column.title}</p>
                        <p className="bg-red-300 p-1 rounded-full text-xs justify-center">{column.cardIds.length}</p>
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                          </svg>
                        </p>
                        <p className="new-task-btn" onClick={() => addNewTask(column.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </p>
                      </div>
                    </div>

                    

                    <Droppable droppableId={column.id} type="card">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="cards">
                          {column.cardIds.map((cardId, index) => (
                            <Draggable key={cardId} draggableId={cardId} index={index}>
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className={`bg-${cardId.split("")[3]}-700 p-2 bg-orange-300 m-2 rounded-xl text-center`}
                                >
                                  {cardId}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
