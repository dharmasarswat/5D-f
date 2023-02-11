import { useState } from "react";
import createApi from "../api";

const validateUrl = (url) =>
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
    url
  );

export default function useCreateTask(methodsList, formInitValue) {
  const api = createApi();
  const [formData, setFormData] = useState(formInitValue);
  const [isUploading, setIsUploading] = useState({
    testFile: false,
    envFile: false,
    loading: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setError("");

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value)) {
      setError("All fields must be filled");
      return;
    }
    if (!validateUrl(formData.serverUrl)) {
      setError("invalid url");
      return;
    }

    if (!methodsList.map(({ key }) => key).includes(formData.method)) {
      setError("Invalid method");
      return;
    }

    setError("");

    try {
      await api.post("/tasks", formData);
      setFormData(formInitValue);
      callback();
    } catch (error) {
      setError(error.response?.data?.message ?? "");
    }
  };

  const handleFileChange = async (e) => {
    setError("");
    const { files, name } = e.target;
    if (!files.length) return;
    const fileType = files[0].type;
    if (
      (name === "testFile" && fileType !== "text/csv") ||
      (name === "envFile" && fileType !== "text/plain")
    ) {
      setError("Invalid filetype, Please choose a correct file");
      return;
    }

    // set loading state true
    setIsUploading((uploading) => ({
      ...uploading,
      [name]: true,
      loading: true,
    }));

    try {
      // get files from form
      const fileFormData = new FormData();
      fileFormData.append("file", files[0]);

      // upload files
      const res = await api.post("/upload", fileFormData);

      // set file to be submitted with form
      setFormData((data) => ({
        ...data,
        [name]: res.data.name,
      }));
    } catch (error) {
      setError(error.response?.data?.message ?? "");
    }

    // set loading state to false
    setIsUploading((uploading) => ({
      ...uploading,
      [name]: false,
      loading: false,
    }));
  };

  return {
    formData,
    isUploading,
    error,
    handleChange,
    handleSubmit,
    handleFileChange,
  };
}
