import React, { useState } from "react";
import "./App.css";
import {
  Box,
  BoxProps,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

const StyledModalContent = styled(Box)<BoxProps>`
  text-align: center;
`;

interface IFormData {
  username: string;
  email: string;
  phone: string;
  // dob: Dayjs | null;
  dob: string;
}

function App() {
  const [open, setOpen] = useState(false);
  const { register, control, reset, handleSubmit } = useForm<IFormData>();

  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the modal and reset the form
  const handleClose = () => {
    setOpen(false);
    reset({
      email: "",
      phone: "",
      username: "",
      dob: "",
    });
  };

  const handleOnSubmit: SubmitHandler<IFormData> = (data) => {
    if (
      data?.phone?.length !== 10 ||
      (data?.dob && dayjs(data?.dob).isAfter(dayjs(), "date"))
    ) {
      if (data?.phone?.length !== 10)
        alert("Invalid phone number. Please enter a 10-digit phone number.");
      if (data?.dob && dayjs(data?.dob).isAfter(dayjs(), "date"))
        alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      reset({
        email: "",
        phone: "",
        username: "",
        dob: "",
      });
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h1" fontSize="32px" mb={4}>
        User Details Modal
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Open Form
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          transition: {
            timeout: 0,
          },
        }}
        TransitionProps={{ timeout: 0 }}
        TransitionComponent={React.Fragment}
      >
        <DialogContent
          className="modal"
          style={{
            padding: "30px 60px",
          }}
        >
          <StyledModalContent
            component="form"
            className="modal-content"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Fill Details
            </Typography>
            <FormControl>
              <FormLabel htmlFor="username">Username:</FormLabel>
              <TextField
                type="text"
                id="username"
                {...register("username")}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email Address:</FormLabel>
              <TextField
                type="email"
                id="email"
                {...register("email")}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Phone Number:</FormLabel>
              <TextField
                type="text"
                id="phone"
                {...register("phone")}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
              {/* <Controller
                name="dob"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        key={Math.random()}
                        format="DD-MM-YYYY"
                        slotProps={{
                          textField: {
                            id: "dob",
                          },
                        }}
                        {...field}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              /> */}
              <TextField type="date" id="dob" {...register("dob")} required />
            </FormControl>
            <Button type="submit" variant="contained" className="submit-button">
              Submit
            </Button>
          </StyledModalContent>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export default App;
