import axios from "axios";
import { useState, useEffect } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

axios.defaults.baseURL = "http://localhost:8080";

export const TeacherOverviewPage = () => {
  const [token] = useToken();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
      axios
        .post(
          "/api/passphrase/mySubjects",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setOptions(response.data);
        })
        .catch(function (error) {
          if (error.response) {
            setShowErrorMessage(error.response.data);
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

  }, [token]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
        {options.map((option) =>
        
       <option key={option.subject_id} >
        {option.subject_name}
       </option>
      )}
        </select>
      </label>
    );
  };

  return (
    <div className="content-container">
      <h2>Create Check-in Passphrase</h2>
      {showSuccessMessage && (
        <div className="success">{showSuccessMessage}</div>
      )}
      {showErrorMessage && <div className="fail">{showErrorMessage}</div>}

      <h2>Welcome Teacher</h2>
      <div>
        <Dropdown
          label="Select Semester and Subject"
          options={options}
          value={value}
          onChange={handleChange}
        />
      </div>
      <br />
      <input type="hidden" id="selectedSemester" name="semester" required />
      <input type="hidden" id="selectedSubjectID" name="subject_id" required />
      <input
        type="text"
        name="passphrase"
        id="passphrase_input"
        placeholder="Passphrase"
        required
      />
      <br />
      <button type="submit" id="submit-passphrase-button">
        Generate
      </button>
    </div>
  );
};
