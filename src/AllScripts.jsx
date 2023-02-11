import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container, Skeleton } from "@mui/material";
import useAllScripts from "./hooks/useAllScripts";

export default function AllScripts() {
  const { tasks, isLoading } = useAllScripts();

  if (!tasks.length && !isLoading)
    return (
      <Typography variant="h4" component="div" sx={{ padding: "4rem" }}>
        No tasks found
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ padding: "5rem 2rem" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. no.</TableCell>
              <TableCell align="right">Test name</TableCell>
              <TableCell align="right">Added on</TableCell>
              <TableCell align="right">Time taken</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow
                key={task._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th">{index + 1}</TableCell>
                <TableCell align="right">{task.taskName}</TableCell>
                <TableCell align="right">
                  {new Date(task.createdAt).toDateString()}
                </TableCell>
                <TableCell align="right">{task.timeTaken}</TableCell>
                <TableCell align="right">{task.status}</TableCell>
              </TableRow>
            ))}

            {/* show loader if data is loading */}
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <Loader key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const Loader = () => (
  <TableRow>
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
    <TableCell align="right">
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </TableCell>
  </TableRow>
);
