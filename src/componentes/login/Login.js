import React, {Fragment}from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const Login = (props) => {
  const loginPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "530px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
  };
  const { touched, errors } = props;
  return(
    <Fragment>
      <div className="container">
        <div className="login-wrapper" style={loginPageStyle}>
          <h2>Inicio de Sesión</h2>
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="email">Ingrese Email</label>
              <Field type="text" name="email" className={"form-control"} placeholder="Email" />
              { touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="password">Ingrese Password</label>
              <Field type="password" name="password" className={"form-control"} placeholder="Password" />
              { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span> }
            </div>
            <button type="submit" className="btn btn-primary">Iniciar</button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}

const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || '',
      password: props.password || ''
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email no valido').required('Email es requerido'),
    password: Yup.string().required('Password es requerido')
  }),
  handleSubmit: (values) => {
    const api = "http://prueba.brik.cl/api/login";
    fetch(api, {
      method: 'post',
      body: JSON.stringify(values)
    }).then(response=> {
      if (response.ok) {
        return response.json();
      } else {
        // HANDLE ERROR
        throw new Error('Algo salio mal...');
      }
    }).then(data => {
      // HANDLE RESPONSE DATA
      console.log(data);
    }).catch((error) => {
      // HANDLE ERROR
      console.log(error);
    });
  }
})(Login);

export default LoginFormik