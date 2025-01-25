"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";

const CreateState = () => {
  const [state, setState] = useState({
    name: "",
    country_id: "",
  });

  const [showCountry, setShowCountry] = useState([]);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("State Name is Required")
      .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "This field cannot contain white space and special characters"
      )
      .trim(),
    country_id: Yup.string().required("Country is Required"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      })
      .catch((err) => {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      });
  };

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await axios.get("http://localhost:8800/countries");
        setShowCountry(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchAllCountries();
  }, []);

  const router = useRouter();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(state, { abortEarly: false });
      console.log("State Created successfully");
      await axios.post("http://localhost:8800/states", state);
      console.log(state);

      router.push("/layout/states");
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
    <PageContainer title="Create State" description="Add a new State">
      <DashboardCard title="Add State">
        <form>
          <div className="row mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="country_id">Select Country</label>
              <select
                className="form-control"
                name="country_id"
                value={state.country_id}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {showCountry.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.country_id && (
                <small className="text-danger">{errors.countryId}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="name">State Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter State"
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
            <Link href="/layout/states">
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

export default CreateState;
