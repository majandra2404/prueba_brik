import React, {Fragment}from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const Register = (props) => {
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
          <h2>Registro de Usuario</h2>
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="nombres">Ingrese Nombres</label>
              <Field type="text" name="nombres" className={"form-control"} placeholder="Nombres" />
              { touched.nombres && errors.nombres && <span className="help-block text-danger">{errors.nombres}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="apellido_paterno">Ingrese Apellido Paterno</label>
              <Field type="text" name="apellido_paterno" className={"form-control"} placeholder="Apellido Paterno" />
              { touched.apellido_paterno && errors.apellido_paterno && <span className="help-block text-danger">{errors.apellido_paterno}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="apellido_materno">Ingrese Apellido Materno</label>
              <Field type="text" name="apellido_materno" className={"form-control"} placeholder="Apellido Materno" />
              { touched.apellido_materno && errors.apellido_materno && <span className="help-block text-danger">{errors.apellido_materno}</span> }
            </div>
            <div className="form-group">
              <label htmlFor="apellido_materno">Ingrese Rut</label>
              <Field type="text" name="rut" className={"form-control"} placeholder="Rut" />
              { touched.rut && errors.rut && <span className="help-block text-danger">{errors.rut}</span> }
            </div>
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
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirme Password</label>
              <Field type="password" name="password_confirmation" className={"form-control"} placeholder="Confirme Password" />
              { touched.password_confirmation && errors.password_confirmation && <span className="help-block text-danger">{errors.password_confirmation}</span> }
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}

const RegisterFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      nombres: props.nombres || '',
      apellido_paterno: props.apellido_paterno || '',
      apellido_materno: props.apellido_materno || '',
      rut: props.rut || '',
      email: props.email || '',
      password: props.password || '',
      password_confirmation: props.password_confirmation || ''
    }
  },
  validationSchema: Yup.object().shape({
    nombres: Yup.string().required('Nombres es requerido'),
    apellido_paterno: Yup.string().required('Apellido Paterno es requerido'),
    apellido_materno: Yup.string().required('Apellido Materno es requerido'),
    rut: Yup.string().required('Rut es requerido'),
    email: Yup.string().email('Email no valido').required('Email es requerido'),
    password: Yup.string().required('Password es requerido'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords no coinciden').required('Confirm Password is required')
  }),
  handleSubmit: (values) => {
    const api = "http://prueba.brik.cl/api/register";
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
})(Register);

export default RegisterFormik