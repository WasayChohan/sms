"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./users.css";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Link from "next/link";
import { IconBuildingTunnel } from "@tabler/icons-react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Card, CardHeader, Typography } from "@mui/material";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  phone: number;
  email: string;
  // password: string;
  // gender: string;
  // region_id: string;
  // address: string;
  // last_school: string;
  // city_id: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data); // Ensure this matches the response structure
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8800/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 80,
        enableSorting: false,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "father_name",
        header: "Father",
        size: 200,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 250,
      },
      // {
      //   accessorKey: "gender",
      //   header: "Gender",
      //   size: 100,
      // },
      // {
      //   accessorKey: "address",
      //   header: "Address",
      //   size: 200,
      // },
      // {
      //   accessorKey: "city_id",
      //   header: "City",
      //   size: 150,
      // },

      {
        id: "actions",
        header: "Actions",
        size: 135,
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "1px" }}>
            <Link href={`/layout/users/viewUser/${row.original.id}`}>
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
            </Link>
            <Link href={`users/${row.original.id}`}>
              <button
                style={{
                  backgroundColor: "#17a2b8",
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
        <Link href="/layout/createUser">
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
            Add User
          </button>
        </Link>
      </div>

      <Card>
        <h4
          style={{
            color: "#5A6A85",
            padding: "10px 0 0 10px",
          }}
        >
          {" "}
          Users List{" "}
        </h4>
        <MaterialReactTable
          columns={columns}
          data={users}
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

export default Users;
