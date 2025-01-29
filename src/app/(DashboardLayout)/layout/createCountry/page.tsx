"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreateCountry = () => {
  const [country, setCountry] = useState({
    name: "",
  });

  // const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("First Name is Required")
      .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "This field cannot contain white space and special character"
      )
      .trim(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCountry((prev) => ({ ...prev, [name]: value }));

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      })
      .catch((err) => {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      });
  };

  const router = useRouter();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(country, { abortEarly: false });
      console.log("Country Created successfully");
      await axios.post("http://localhost:8800/api/countries", country);
      router.push("/layout/countries");
    } catch (err: any) {
      if (err.inner) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          validationErrors[error.path!] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <PageContainer title="Create Country" description="Add a new Country">
      <DashboardCard title="Add Country">
        <form>
          <div className="row mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="name">Country Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                onChange={handleChange}
                name="name"
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "50px",
            }}
          >
            <button
              style={{
                padding: "10px 15px",
                fontSize: "14px",
                borderRadius: "4px",
                background: "#5D87FF",
                color: "#ffffff",
                border: "0",
              }}
              onClick={handleClick}
            >
              Save
            </button>
            <Link href="/layout/countries">
              <button
                style={{
                  padding: "10px 15px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  background: "#dc3545",
                  color: "#ffffff",
                  border: "0",
                }}
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateCountry;
