"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Divider,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

function ProfilePage() {
  const [profileImage, setProfileImage] = useState<any | null>(null);
  const [isEditing, setISEditing] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Cena");
  const [email, setEmail] = useState("abc@gmail.com");
  const [number, setNumber] = useState("******");
  const [country, setCountry] = useState("Pakistan");
  const [city, setCity] = useState("MirpurKhas");
  const [postalcode, setPostalCode] = useState("69000");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditing = () => {
    setISEditing((prev) => !prev);
  };

  return (
    <PageContainer title="Profile Page" description="Manage your profile">
      <DashboardCard title="Profile">
        <Box display="flex" alignItems="center" gap={2}>
          <Box position="relative">
            <Avatar
              src={profileImage}
              alt="Profile"
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: -5,
                right: -5,
                backgroundColor: "white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CameraAltIcon />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </IconButton>
          </Box>

          <Box>
            <Typography>
              {" "}
              <b>Admin</b>{" "}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary">
              Leeds, Pakistan
            </Typography>
          </Box>
        </Box>
      </DashboardCard>

      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: "end" }}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={toggleEditing}
        >
          {isEditing ? "Save" : "Edit"} Profile
        </Button>
      </Box>

      <DashboardCard title="Personal Information">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>
                  First Name <br />{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  ) : (
                    <b>{firstName}</b>
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  Last Name <br />
                  {isEditing ? (
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  ) : (
                    <b>{lastName}</b>
                  )}
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography>
                  Date of Birth <br /> <b>04-09-2002</b>
                </Typography>
              </TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>
                  Email <br />
                  {isEditing ? (
                    <input
                      type="email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  ) : (
                    <b>{email}</b>
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  Phone <br />{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      required
                      name="number"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                  ) : (
                    <b> {number} </b>
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  User Role <br /> <b>Admin</b>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DashboardCard>

      <Divider sx={{ my: 2 }} />
      {/* <Box sx={{ textAlign: "end" }}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={toggleEditing}
        >
          {isEditing ? "Save" : "Edit"} Address
        </Button>
      </Box> */}

      <DashboardCard title="Address">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>
                  Country <br />
                  {isEditing ? (
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  ) : (
                    <b> {country} </b>
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  City <br />
                  {isEditing ? (
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  ) : (
                    <b> {city} </b>
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  Postal Code <br />
                  {isEditing ? (
                    <input
                      type="text"
                      value={postalcode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                      }}
                    />
                  ) : (
                    <b> {postalcode} </b>
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DashboardCard>
    </PageContainer>
  );
}

export default ProfilePage;
