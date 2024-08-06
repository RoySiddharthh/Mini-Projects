import React, { useEffect, useState } from "react";
import "./datasort.css";

function DataSort() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("");

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

  function aTozSort() {
    const aTozArray = data
      .map((item) => {
        return item.firstName;
      })
      .sort();
    const myobj = { firstName: "" };
    const aTozobj = aTozArray.map((item) => ({ ...myobj, firstName: item }));
    setData(aTozobj);
  }

  function ztoaSort() {
    const zToaArray = data
      .map((item) => item.firstName)
      .sort()
      .reverse();
    const myobj = { firstName: "" };
    const zToaobj = zToaArray.map((item) => ({ ...myobj, firstName: item }));
    setData(zToaobj);
  }

  useEffect(() => {
    if (sort === "Sort A-Z") {
      aTozSort();
    } else if (sort === "Sort Z-A") {
      ztoaSort();
    }
  }, [sort]);

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
  return (
    <React.Fragment>
      <div className="datasort-container">
        <h1>Data Sort</h1>
        <div className="selection-dropdown">
          <label htmlFor="dropdown">Please select a value from dropdown</label>
          <select
            id="sortCondition"
            name="sortCondition"
            autoFocus
            value={sort}
            onChange={(event) => {
              console.log(event.target.value);
              setSort(event.target.value);
            }}
          >
            <option value="" disabled selected>
              Please select a value...
            </option>
            <option value="Sort A-Z">Sort A-Z</option>
            <option value="Sort Z-A">Sort Z-A</option>
          </select>
          {/* <button
            type="button"
            onClick={() => {
              aTozSort();
            }}
          >
            Click Me!
          </button> */}
          {/* <button
            type="button"
            onClick={() => {
              ztoaSort();
            }}
          >
            Click Me!
          </button> */}
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
