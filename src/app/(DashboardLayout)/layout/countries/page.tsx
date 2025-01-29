"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Card } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useMediaQuery } from "@mui/material";

type country = {
  id: number;
  name: string;
  is_active: number;
};

function Countries() {
  const [countries, setCountries] = useState<country[]>([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/countries");
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching Countries:", err);
      }
    };
    fetchAllCountries();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8800/api/countries/${id}`);
      setCountries((prev) => prev.filter((country) => country.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: number) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      await axios.put(
        `http://localhost:8800/api/countries/is_active/update/${id}`,
        { is_active: newStatus }
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
        size: isSmallScreen ? 100 : 330,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: isSmallScreen ? 150 : 330,
      },
      {
        accessorKey: "is_active",
        header: "Status",
        size: isSmallScreen ? 100 : 330,
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
        size: isSmallScreen ? 100 : 135,
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "1px" }}>
            <Link href={`countries/${row.original.id}`}>
              <button
                style={{
                  backgroundColor: "#5D87FF",
                  color: "#fff",
                  border: "none",
                  padding: "5px 5px",
                  fontSize: isSmallScreen ? "12px" : "14px",
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
                fontSize: isSmallScreen ? "12px" : "14px",
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
    [isSmallScreen]
  );

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Link href="/layout/createCountry">
          <button
            style={{
              padding: "10px 15px",
              fontSize: "14px",
              borderRadius: "4px",
              background: "#5D87FF",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Country
          </button>
        </Link>
      </div>

      <Card>
        <h4 style={{ padding: "10px 0 0 10px" }}>Countries List</h4>
        <div style={{ overflowX: "auto" }}>
          <MaterialReactTable
            columns={columns}
            data={countries}
            enableSorting
            enablePagination
            enableColumnResizing
            enableRowSelection={false}
            enableStickyHeader
            enableDensityToggle
            muiTableBodyRowProps={{ hover: true }}
            muiTablePaperProps={{
              sx: {
                paddingLeft: "16px",
                minWidth: isSmallScreen ? "100%" : "600px",
              },
            }}
            initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
            muiTableBodyCellProps={{
              sx: {
                fontSize: isSmallScreen ? "12px" : "14px",
                padding: isSmallScreen ? "8px" : "16px",
              },
            }}
            muiTableHeadCellProps={{
              sx: {
                fontSize: isSmallScreen ? "12px" : "14px",
                padding: isSmallScreen ? "8px" : "16px",
              },
            }}
          />
        </div>
      </Card>
    </div>
  );
}

export default Countries;
