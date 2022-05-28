import axios from "axios";
import { useState, useEffect } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";


axios.defaults.baseURL = "http://localhost:8080";

export const TeacherOverviewPage = () => {
  const [token] = useToken();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

}