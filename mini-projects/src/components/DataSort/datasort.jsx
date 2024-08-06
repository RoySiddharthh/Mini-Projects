import React, { useEffect, useState } from "react";
import "./datasort.css";

function DataSort() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortedData, setSortedData] = useState([
    {
      firstName: "",
      lastName: "",
    },
  ]);

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users", {
        method: "GET",
      });
      const result = await response.json();
      const userData = result.users;
      if (result && userData && userData.length > 0) {
        setLoading(false);
        setData(userData);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  //   console.log(data.sort());
  function aTozSort() {
    // let cpyUsers = [...data];
    // cpyUsers = cpyUsers.sort((firstUser, secondUser) =>
    //   firstUser.firstName > secondUser.secondName ? 1 : -1
    // );
    // console.log(cpyUsers);
    // setData(cpyUsers);

    const aTozArray = data.map((item) => item.firstName).sort();
    setData(...aTozArray);
    console.log(sortedData);

    // console.log(
    //   aTozArray.map((item) => {
    //     setSortedData(...sortedData, item.firstName);
    //   })
    // );
    // setData(aTozArray);
    // console.log(aTozArray);
  }

  function ztoaSort() {
    const zToaArray = data
      .map((item) => item.firstName)
      .sort()
      .reverse();
    setData(zToaArray);
    console.log(zToaArray);
  }

  if (loading) {
    return (
      <div className="datasort-container">
        <h2>Please Wait!!! We are fetching your data</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="datasort-container">
        <h2>
          Some error occured while fetching data, pls check console for error
          message
        </h2>
      </div>
    );
  }

  console.log(sortedData);
  return (
    <React.Fragment>
      <div className="datasort-container">
        <h1>Data Sort</h1>
        <div className="selection-dropdown">
          <label htmlFor="dropdown">Please select a value from dropdown</label>
          <select id="sortCondition" name="sortCondition" autoFocus>
            <option defaultValue="" disabled selected>
              Please select a value...
            </option>
            <option
              value="Sort A-Z"
              onChange={() => {
                aTozSort();
              }}
            >
              Sort A-Z
            </option>
            <option
              value="Sort Z-A"
              onChange={() => {
                ztoaSort();
              }}
            >
              Sort Z-A
            </option>
          </select>
          <button
            type="button"
            onClick={() => {
              aTozSort();
            }}
          >
            Click Me!
          </button>
        </div>
        <div className="data-container">
          {data.map((item, index) => (
            <div key={index} className="data">
              <h3>{item.firstName}</h3>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default DataSort;
