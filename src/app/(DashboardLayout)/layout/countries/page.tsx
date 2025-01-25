"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
// import "./users.css";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Link from "next/link";
import { IconBuildingTunnel } from "@tabler/icons-react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Card, CardHeader, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";

type country = {
  id: number;
  name: string;
  is_active: number;
};

function Countries() {
  const [countries, setCountries] = useState<country[]>([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await axios.get("http://localhost:8800/countries");
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching Countries:", err);
      }
    };
    fetchAllCountries();
  }, []);
  console.log(countries);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8800/countries/${id}`);
      setCountries((prev) => prev.filter((country) => country.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: number) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;

      await axios.put(
        `http://localhost:8800/countries/is_active/update/${id}`,
        {
          is_active: newStatus,
        }
      );

      setCountries((prev) =>
        prev.map((country) =>
          country.id === id ? { ...country, is_active: newStatus } : country
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const columns = useMemo<MRT_ColumnDef<country>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 330,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 330,
      },
      {
        accessorKey: "is_active",
        header: "Status",
        size: 330,
        Cell: ({ row }) => (
          <Switch
            checked={row.original.is_active === 1}
            onChange={() =>
              handleToggleStatus(row.original.id, row.original.is_active)
            }
            color="primary"
            inputProps={{ "aria-label": "controlled" }}
          />
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 135,
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "1px" }}>
            {/* <Link href={`/layout/countries/viewCountries/${row.original.id}`}>
              <button
                style={{
                  backgroundColor: "#ac8ad3",
                  color: "#fff",
                  border: "none",
                  padding: "5px 5px",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                <VisibilityIcon />
              </button>
            </Link> */}
            <Link href={`countries/${row.original.id}`}>
              <button
                style={{
                  backgroundColor: "#5D87FF",
                  color: "#fff",
                  border: "none",
                  padding: "5px 5px",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                <EditIcon />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(row.original.id)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "5px 5px",
                fontSize: "14px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              <DeleteForeverIcon />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="mb-3">
        <Link href="/layout/createCountry">
          <button
            type="button"
            className="btn "
            style={{
              padding: "10px 15px",
              fontSize: "14px",
              borderRadius: "4px",
              background: "#5D87FF",
              color: "#ffffff",
            }}
          >
            Add Country
          </button>
        </Link>
      </div>

      <Card>
        <h4
          style={{
            // color: "#5A6A85",
            padding: "10px 0 0 10px",
          }}
        >
          {" "}
          Countries List{" "}
        </h4>
        <MaterialReactTable
          columns={columns}
          data={countries}
          enableSorting
          enablePagination
          enableColumnResizing
          enableRowSelection={false}
          muiTableBodyRowProps={{
            hover: true,
          }}
          muiTablePaperProps={{
            sx: {
              paddingLeft: "16px",
            },
          }}
        />
      </Card>
    </div>
  );
}

export default Countries;
