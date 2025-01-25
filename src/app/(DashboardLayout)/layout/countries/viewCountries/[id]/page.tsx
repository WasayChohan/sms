"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const ViewCountry = () => {
  const [country, setCountry] = useState([]);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = () => {
    axios.get(`http://localhost:8800/countries/ ${id}`).then(function (res) {
      console.log(res.data[0]);
      setCountry(res.data[0]);
    });
  };

  // console.log(user);
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Countries View Page">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>
                  <label>Name</label>
                  <span className="form-control">{country.name}</span>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          <Link href="/layout/countries">
            <button
              type="button"
              className="btn "
              style={{
                padding: "10px 15px",
                fontSize: "14px",
                borderRadius: "4px",
                background: "#5D87FF",
                color: "#ffffff",
                margin: "50px 0 0 15px",
              }}
            >
              Back
            </button>
          </Link>
        </Table>
      </DashboardCard>
    </PageContainer>
  );
};

export default ViewCountry;
