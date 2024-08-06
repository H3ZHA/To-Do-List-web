import './App.css';
import React, { useState } from 'react';

function App() {
  const [display, setDisplay] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [addCount, setAddCount] = useState(0);
  const [deleteCount, setDeleteCount] = useState(0);

  // get data through API
  const getData = async () => {
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    let logs = data.todos;

    setTableRows(logs);
  };
  getData();

  // add new item through API
  const addItemAPI = async (thisUserId, thisTodo) => {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: thisTodo,
        completed: false,
        userId: thisUserId,
      })
    })
    const res = await response.json();
    if(res.id != null){
      alert("Add success: \n" + JSON.stringify(res, null, 2));
      setAddCount(addCount + 1);
    }
    else{
      alert("Add fail: \n" + JSON.stringify(res, null, 2));
    }
  };

  const addItem = () => {
    const userIdInput = prompt("Please enter user id:");
    if(userIdInput !== null){
      const todoInput = prompt("Please enter todo:");
      if (todoInput !== null) {
        addItemAPI(userIdInput, todoInput);
      }
    }
  };

  // delete item through API
  const deleteItemAPI = async (id) => {
    const response = await fetch("https://dummyjson.com/todos/" + id, {method: "DELETE",});
    const res = await response.json();
    if(res.id != null){
      alert("Delete success: \n" + JSON.stringify(res, null, 2));
      setDeleteCount(deleteCount + 1);
    }
    else{
      alert("Delete fail: \n" + JSON.stringify(res, null, 2));
    }
  };

  const deleteItem = (id, todo) => {
    // eslint-disable-next-line no-restricted-globals
    const userClick = confirm("Delete id " + id + ": " + todo + "?");
    if (userClick) {
      deleteItemAPI(id);
    }
  };

  return (
    <div>
      <button onClick={() => addItem()}>Add</button>
      <p>You have add {addCount} items and delete {deleteCount} items</p>
      <button onClick={() => setDisplay(0)}>All</button>
      <button onClick={() => setDisplay(1)}>Done</button>
      <button onClick={() => setDisplay(2)}>Not Done</button>
      <table border="1">
        <tr>
          <th>Id</th>
          <th>Todo</th>
          <th>User Id</th>
          <th>Completed</th>
          <th></th>
        </tr>

        {(() => {
        if (display == 0){
          return (
            <>
            {tableRows.map((row) => (
              <tr>
                <th>{row.id}</th>
                <th>{row.todo}</th>
                <th>{row.userId}</th>
                {(() => {
                  if(row.completed){
                    return <th><input type="checkbox" checked disabled></input></th>
                  }
                  else{
                    return <th><input type="checkbox" disabled></input></th>
                  }
                })()}
                <th><button onClick={() => deleteItem(row.id, row.todo)}>Delete</button></th>
              </tr>
            ))}
            </>
          );
        } else if (display == 1){
          return (
            <>
            {tableRows.map((row) => (
              <>
              {(() => {
                if(row.completed){
                  return(
                    <>
                    <tr>
                    <th>{row.id}</th>
                    <th>{row.todo}</th>
                    <th>{row.userId}</th>
                    <th><input type="checkbox" checked disabled></input></th>
                    <th><button onClick={() => deleteItem(row.id, row.todo)}>Delete</button></th>
                    </tr>
                    </>
                  )
                }
              })()}
              </>
            ))}
            </>
          );
        } else if (display == 2){
          return (
            <>
            {tableRows.map((row) => (
              <>
              {(() => {
                if(!row.completed){
                  return(
                    <>
                    <tr>
                    <th>{row.id}</th>
                    <th>{row.todo}</th>
                    <th>{row.userId}</th>
                    <th><input type="checkbox" disabled></input></th>
                    <th><button onClick={() => deleteItem(row.id, row.todo)}>Delete</button></th>
                    </tr>
                    </>
                  )
                }
              })()}
              </>
            ))}
            </>
          );
        }
      })()}
      </table>
    </div>
  );
}

export default App;
