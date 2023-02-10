import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Skeleton } from "@mui/material";
import axios from "axios";

const apiURL = "http://localhost:3005";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

export default function AllScripts() {
  const [tests, setTests] = React.useState([]);

  React.useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(`${apiURL}/tests`);
        setTests(res.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchTests();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: "5rem 2rem" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. no.</TableCell>
              <TableCell align="right">Test name</TableCell>
              <TableCell align="right">Added on</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th">{index}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}

            {!rows.length &&
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell component="th">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
