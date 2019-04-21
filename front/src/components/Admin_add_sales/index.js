import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './index.scss';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import home from '../../assets/home.svg';
import { Link } from "react-router-dom";

Yup.addMethod(Yup.mixed, 'sameAs', function mes(ref, message) {
  return this.test('sameAs', message, function mess(value) {
    const other = this.resolve(ref);
    return !other || !value || value === other;
  });
});

class AddSales extends Component {

  constructor(props) {
    super(props)
    this.state = {
      productId: "",
      nextRoute: "",
      isValide: true,
      isSubmited: false,
    }
  }

  componentDidMount() {
    this.setState({
      nextRoute: '/confirm/confirm-sales'
    })

    if (this.state.productId.length !== 0) {
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isSubmited !== prevState.isSubmited && this.state.nextRoute !== "" && this.state.productId !== 0) {
      this.props.history.push(this.state.nextRoute)
    }
  }

  postSales(values, actions) {
    axios.post('/api/add_sales', {
      country: values.country,
      password: values.password,
    })
      .then(response => {
        actions.setSubmitting(false);
        this.setState({
          isSubmited: true
        })
      })
  }


  render() {
    return (
      <div className="admin_add_sales_body">
        <div>
        <Link to="/admin" className="login" type="submit"><img src={home} className="login" alt="order" /></Link>

          <h1 className="first_title">
            Add new seller account
          </h1>
          <Formik
            initialValues={{
              country: '',
              password: '',
            }}
            onSubmit={(values, actions) => this.postSales(values, actions)}
            validationSchema={Yup.object().shape({
              country: Yup.string()
                .min(2, 'Country name is longer than that')
                .required('Country is required.'),
              password: Yup.string()
                .min(3, 'Password is longer than that')
                .required('Password is required.'),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <div className="admin_add_sales_form_container">
                  <form onSubmit={handleSubmit}>
                    <div className="form_container">
                      <div className="admin_add_sales_shop_info_container">
                        <h2 className="admin_add_sales_h2">Account infos</h2>
                        <legend>Country</legend>
                        <input
                          id="country"
                          type="text"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.country && touched.country
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.country && touched.country && (
                          <div className="input-feedback">{errors.country}</div>
                        )}
                        <legend>Password</legend>
                        <input
                          id="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />

                        {errors.password && touched.password && (
                          <div className="input-feedback">{errors.password}</div>
                        )}

                      </div>
                    </div>
                    <div className="admin_add_sales_button_container">
                      <div className="admin_add_sales_button_reset">
                        <button
                          type="button"
                          className="button outline admin_add_sales_button"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                  </button>
                      </div>
                      <div className=" admin_add_sales_button_submit">
                        <button className="button admin_add_sales_button" type="submit" disabled={isSubmitting} >
                          Add
                  </button>
                      </div>
                    </div>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    )
  };
}

export default withRouter(AddSales);