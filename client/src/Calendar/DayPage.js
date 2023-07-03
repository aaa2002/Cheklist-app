import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Day() {
  const { absoluteDate } = useParams();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [formData, setFormData] = useState({
    //date: absoluteDate,
    name: "",
    description: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    name: formData.name,
    description: formData.description,
  });

  useEffect(() => {
    fetch(`/day/${absoluteDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        console.log("API Response:", data);
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [absoluteDate, backendData, showUpdateForm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: value,
      }));
    } else if (name === "description") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: value,
      }));
    } else if (name === "updateName") {
      setUpdateFormData((prevFormData) => ({
        ...prevFormData,
        name: value,
      }));
    } else if (name === "updateDescription") {
      setUpdateFormData((prevFormData) => ({
        ...prevFormData,
        description: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/day/addTask/${absoluteDate}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        absoluteDate,
        name: formData.name,
        description: formData.description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data saved: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <div className="day-page">
      <h1>Day Page</h1>
      {typeof backendData === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.map((task) => (
          <div className="task" key={task._id}>
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            {showUpdateForm === false ? (
              <button
                onClick={() => {
                  setUpdateFormData({
                    name: task.name,
                    description: task.description,
                  });
                  setShowUpdateForm(true);
                }}
                className="updateButton"
              >
                Update
              </button>
            ) : (
              <form className="taskInput">
                <label>
                  Name:
                  <input
                    type="text"
                    name="updateName"
                    value={updateFormData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    type="text"
                    name="updateDescription"
                    value={updateFormData.description}
                    onChange={handleChange}
                  />
                </label>
                <input
                  onClick={(event) => {
                    event.preventDefault();
                    if (updateFormData.name && updateFormData.description) {
                      fetch(`/day/updateTask/${task._id}`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          absoluteDate,
                          name: updateFormData.name,
                          description: updateFormData.description,
                        }),
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("Network response not ok!");
                          }
                          return response.json();
                        })
                        .then((data) => {
                          console.log("Data saved: ", data);
                        })
                        .catch((error) => {
                          console.error("Error: ", error);
                        });
                    }
                    setShowUpdateForm(false);
                  }}
                  type="submit"
                  value="Submit"
                />
                <button
                  className="deleteButton"
                  onClick={() => setShowUpdateForm(false)}
                >
                  Cancel
                </button>
              </form>
            )}

            <button
              onClick={(event) => {
                event.preventDefault();
                fetch(`/day/deleteTask/${task._id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    absoluteDate,
                    name: formData.name,
                    description: formData.description,
                  }),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response not ok!");
                    }
                    return response.json();
                  })
                  .then((data) => {
                    console.log("Data saved: ", data);
                  })
                  .catch((error) => {
                    console.error("Error: ", error);
                  });
              }}
              className="deleteButton"
            >
              Delete
            </button>
          </div>
        ))
      )}

      <div>
        <form className="taskInput" onSubmit={handleSubmit}>
          <label>Date: {absoluteDate}</label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}
