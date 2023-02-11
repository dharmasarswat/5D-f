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
import { useNavigate } from "react-router-dom";
import useCreateTask from "./hooks/useCreateScript";

const methodsList = [
  { key: "get", value: "GET" },
  { key: "post", value: "POST" },
  { key: "put", value: "PUT" },
  { key: "delete", value: "DELETE" },
];

const formInitValue = {
  taskName: "",
  serverUrl: "",
  method: methodsList[0].key,
  description: "",
  envFile: "",
  testFile: "",
};

export default function AddScript() {
  const navigation = useNavigate();
  const {
    formData,
    error,
    handleChange,
    handleFileChange,
    handleSubmit,
    isUploading,
  } = useCreateTask(methodsList, formInitValue);

  return (
    <Container maxWidth="sm" sx={{ padding: "2rem" }}>
      <form>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Add new test script
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          id="standard-basic"
          label="Test name"
          variant="outlined"
          value={formData.taskName}
          onChange={handleChange}
          name="taskName"
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
              Select environment file (.txt file)
            </InputLabel>
            <Input
              id="text-input"
              type="file"
              name="envFile"
              accept="text/plain"
              onChange={handleFileChange}
              required
            />
            {isUploading.envFile && <LinearProgress />}
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="csv-input">Select test.csv</InputLabel>
            <Input
              id="csv-input"
              type="file"
              accept="text/csv"
              name="testFile"
              onChange={handleFileChange}
              required
            />
            {isUploading.testFile && <LinearProgress />}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          type="submit"
          onClick={handleSubmit(() => navigation("/all-scripts"))}
          disabled={Boolean(
            Object.values(formData).some((value) => !value) || error
          )}
        >
          Schedule test
        </Button>
      </form>
    </Container>
  );
}
