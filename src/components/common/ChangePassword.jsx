import React, {useState} from "react";
import InputBox from "./InputBox";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {guestChangePassword} from "./../../api/guest";
import {renterChangePassword} from "./../../api/renter";
import {adminChangePassword} from "./../../api/admin";
import {displayNotification} from "./../../services/notificationService";
import {setAuthToken} from "./../../services/authService";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Password is required").min(6).max(256).label("Old Password"),
  newPassword: Yup.string().required("Password is required").min(6).max(256).label("New Password"),
  confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

function ChangePassword({title,location}) {
  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (values, setFieldError, resetForm) => {
    if(location.pathname ==="/dashboard"){
      console.log("here")
      const {data, status} = await guestChangePassword(values);
      if (status !== 200) setFieldError(data.property, data.msg);
      else {
        setAuthToken(data.token);
        displayNotification("success", data.msg);
        resetForm({values: ""});
      }
    }

    if(location.pathname ==="/renter/dashboard"){
      const {data, status} = await renterChangePassword(values);
      if (status !== 200) setFieldError(data.property, data.msg);
      else {
        setAuthToken(data.token);
        displayNotification("success", data.msg);
        resetForm({values: ""});
      }
    }

    if(location.pathname ==="/admin/dashboard"){
      const {data, status} = await adminChangePassword(values);
      if (status !== 200) setFieldError(data.property, data.msg);
      else {
        setAuthToken(data.token);
        displayNotification("success", data.msg);
        resetForm({values: ""});
      }
    }

  };

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError, resetForm}) =>
        handleSubmit(values, setFieldError, resetForm)
      }
    >
      {({errors, touched, values, handleChange, handleBlur}) => (
        <div className="guestDashboard_details">
          <h3 style={{marginBottom: "30px"}}>{title}</h3>
          <Form>
            <div className="relative w-full mb-3">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Old Password"
                values={values}
                type={passwordType}
                name="oldPassword"
                placeholder="Old Password"
                handleChange={handleChange}
                style={{transition: "all .15s ease"}}
              />
            </div>
            <div className="relative w-full mb-3">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="New Password"
                values={values}
                type={passwordType}
                name="newPassword"
                placeholder="Password"
                handleChange={handleChange}
                style={{transition: "all .15s ease"}}
              />
            </div>
            <div className="relative w-full mb-3">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Confirm Password"
                values={values}
                type={passwordType}
                name="confirmPassword"
                placeholder="Confirm Password"
                handleChange={handleChange}
                style={{transition: "all .15s ease"}}
              />
            </div>
            <div className="form-check">
              <input
                style={{cursor: "pointer"}}
                className="form-check-input"
                type="checkbox"
                value=""
                onChange={() => setPasswordType(passwordType === "text" ? "password" : "text")}
                id="flexCheckDefault"
              />
              <label
                style={{cursor: "pointer"}}
                className="form-check-label"
                for="flexCheckDefault"
              >
                Show Password
              </label>
            </div>
            <div className="text-center mt-6">
              <button
                className="btn-primary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="submit"
                style={{transition: "all .15s ease"}}
              >
                Change Password
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default ChangePassword;
