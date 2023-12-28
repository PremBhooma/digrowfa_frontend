import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import "./InputF.css";

const TableForm = () => {
  const [formDataList, setFormDL] = useState([]);
  const [sortedFormData, setSortedFD] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://digrowfa-backend.onrender.com/formData/"
        );
        setFormDL(response.data.form);
        setSortedFD(response.data.form);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (field) => {
    const sortedData = [...sortedFormData];
    sortedData.sort((a, b) => {
      if (field === "postDate" || field === "postTime") {
        const dateA = moment(
          a[field],
          field === "postDate" ? "DD/MM/YYYY" : "HH:mm"
        );
        const dateB = moment(
          b[field],
          field === "postDate" ? "DD/MM/YYYY" : "HH:mm"
        );
        return dateA.isAfter(dateB) ? 1 : -1;
      } else {
        return a[field] > b[field] ? 1 : -1;
      }
    });
    setSortedFD(sortedData);
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filteredData = formDataList.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(searchTermLower)) ||
        (item._id && item._id.toLowerCase().includes(searchTermLower))
    );
    setSortedFD(filteredData);
  };

  return (
    <div>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="sortBtn">
        <button onClick={() => handleSort("postDate")}>Sort with Date</button>
      </div>

      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <table className="table formTb">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">S.No</th>
              <th scope="col">Description</th>
              <th scope="col">FAQ</th>
              <th scope="col">Post Date</th>
              <th scope="col">Post Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedFormData.map((formData, index) => (
              <tr key={formData._id}>
                <td>{index + 1}</td>
                <td>{formData.name}</td>
                <td>{formData.description}</td>
                <td>
                  {formData.faq.map((faq, index) => (
                    <div key={index}>
                      <div>
                        <p className="m-0 fw-medium">Question:</p>
                        <p className="m-0">{faq.question}</p>
                      </div>
                      <div>
                        {/* <p className="m-0 fw-medium">Answers:</p> */}
                        <ol>
                          {faq.answers.map((answer, ansIndex) => (
                            <li key={ansIndex}>
                              <span className="m-0 fw-medium">Answer </span>
                              {`${ansIndex + 1}: ${answer}`}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </td>
                <td>{formData.postDate}</td>
                <td>{formData.postTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableForm;
