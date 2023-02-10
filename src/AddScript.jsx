import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Input,
  Grid,
  Button,
  LinearProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiURL = "http://localhost:3005";

const methodsList = [
  { key: "get", value: "GET" },
  { key: "post", value: "POST" },
  { key: "put", value: "PUT" },
  { key: "delete", value: "DELETE" },
];

const formInitValue = {
  testName: "",
  serverUrl: "",
  method: methodsList[0].key,
  description: "",
  envFile: "",
  testFile: "",
};

export default function AddScript() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState(formInitValue);
  const [isUploading, setIsUploading] = useState({
    testFile: false,
    csvFile: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value)) {
      setError("All fields must pe filled");
      return;
    }

    try {
      const res = await axios.post(`${apiURL}/tasks`, formData);
      setError("");
      navigation("/all-scripts");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onFileChange = async (e) => {
    const { files, name } = e.target;
    setIsUploading((uploading) => ({ ...uploading, [name]: true }));
    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const res = await axios.post(`${apiURL}/upload`, formData, {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      setFormData((data) => ({
        ...data,
        [name]: `${apiURL}/${res.data.name}`,
      }));
    } catch (error) {
      console.log(error);
    }
    setIsUploading((uploading) => ({ ...uploading, [name]: true }));
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "5rem 2rem" }}>
      <form>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Add new test script
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          id="standard-basic"
          label="Test name"
          variant="outlined"
          value={formData.testName}
          onChange={handleChange}
          name="testName"
          fullWidth
          required
        />
        <TextField
          id="standard-basic"
          label="Server url"
          value={formData.serverUrl}
          onChange={handleChange}
          name="serverUrl"
          variant="outlined"
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.method}
            label="Method"
            name="method"
            onChange={handleChange}
            required
          >
            {methodsList.map((method) => (
              <MenuItem value={method.key} key={method.key}>
                {method.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="standard"
          label="Description"
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
          name="description"
          multiline
          rows={4}
          fullWidth
          required
        />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <InputLabel htmlFor="text-input">
              Select environment file
            </InputLabel>
            <Input
              id="text-input"
              type="file"
              name="envFile"
              accept="text/plain"
              onChange={onFileChange}
              required
            />
            {isUploading.testFile && <LinearProgress />}
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="csv-input">Select test.csv</InputLabel>
            <Input
              id="csv-input"
              type="file"
              accept=".csv"
              name="testFile"
              onChange={onFileChange}
              required
            />
            {isUploading.testFile && <LinearProgress />}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          type="submit"
          onClick={handleSubmit}
        >
          Schedule test
        </Button>
      </form>
    </Container>
  );
}
