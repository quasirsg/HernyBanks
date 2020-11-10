import React from "react";
import { useFormik } from "formik";
import { View} from 'react-native';
import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {

    },
  });
  return (
    <View>
        <View>
         <Link to="/Welcome">
         <Icon name="angle-left" color="#422C63" size={50} /></Link>
         </View>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type="submit">Submit</button>
    </form>
    </View>
  );
};
export default Login
