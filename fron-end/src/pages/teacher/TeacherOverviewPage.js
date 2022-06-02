import axios from "axios";
import { useState, useEffect } from "react";
import { useToken } from "../../auth/useToken";
import Select from 'react-select'
import { Navbar } from "../../fragment/TeacherNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


axios.defaults.baseURL = "http://localhost:8080";

export const TeacherOverviewPage = () => {
  const [token] = useToken();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState([]);
  const [passPhraseValue, setPassPhraseValue] = useState('');

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
          toast.error(error.response.data)
          // setShowErrorMessage(error.response.data);
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

  }, [token]);
  const onGenerateClicked = async () => {

    await axios.post('/api/passphrase', {
      subject_id: selected.subject_id,
      semester: selected.semester,
      passphrase: passPhraseValue
    },
      {
        headers: { Authorization: `Bearer ${token}` },
      }


    ).then((response) => {
      sessionStorage.setItem("passphrase", response.data)
      // setShowSuccessMessage(response.data)
      toast.success('Your passphrase: ' + response.data)

    }).catch(function (error) {
      if (error.response) {
        // setShowErrorMessage(error.response.data)
        toast.error(error.response.data)
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

      }
    });

  }
  useEffect(() => {
    if (showErrorMessage || showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false)
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const jwt = token.split('.')[1]
  const decoded = JSON.parse(window.atob(jwt))
  const email = decoded['email']
  console.log(email)

  return (
    <div>
      <Navbar />
      <div className="auth-content-container">
        {/* <div className="content-container"> */}
        <h2>Create Check-in Passphrase</h2>
        {showSuccessMessage && (
          <div className="success">{showSuccessMessage}</div>
        )}
        {showErrorMessage && <div className="fail">{showErrorMessage}</div>}

        <h2>Welcome {email}</h2>
        <div className="form-outline mb-4">

          <br />
          {/* <input type="hidden" id="selectedSemester" name="semester" required />
      <input type="hidden" id="selectedSubjectID" name="subject_id" required /> */}
          <div className="form-outline mb-4">
            <label className="auth-label">Passphrase</label>
            <input
              className="form-control"
              required
              // type="email"
              type="text"
              name="passphrase"
              id="passphrase_input"
              placeholder="Passphrase"
              onChange={(e) => setPassPhraseValue(e.target.value)}
            />

            <Select
              name="form-dept-select"
              options={options}
              // defaultValue={{ label: "Select Semester and Subject", value: 0 }}
              getOptionLabel={option => [option.semester, " - ", option.subject_name]}
              getOptionValue={option => [option.subject_id, option.semester, option.subject_name]}
              placeholder={"Select Semester and Subject"}
              onChange={e => {
                setSelected({
                  subject_id: e.subject_id,
                  semester: e.semester,
                });
              }}
            />
          </div>
          <br />
          <button className="btn btn-success btn-block mb-4"
            disabled={!passPhraseValue || !selected}
            type="submit"
            id="submit-passphrase-button"
            onClick={onGenerateClicked}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};
