import React from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { fetchAsyncLogin } from "./loginSlice";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          // Check user info
          const resultReg = await dispatch(fetchAsyncLogin(values));
          // Check result
          if (fetchAsyncLogin.fulfilled.match(resultReg)) {
            if (
              resultReg.payload["id"] !== "" &&
              resultReg.payload["id"] !== null &&
              typeof resultReg.payload["id"] !== "undefined"
            ) {
              localStorage.setItem("user_id", resultReg.payload["id"]);
              await history.push(`/post/${resultReg.payload["id"]}`);
            } else {
              alert("Email address or password is wrong");
              await history.push(`/`);
            }
          } else {
            await history.push(`/`);
          }
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <h1>Login</h1>

                <input
                  placeholder="email"
                  type="input"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
