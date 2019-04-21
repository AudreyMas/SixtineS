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

class AddProduct extends Component {

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
      nextRoute: '/confirm/confirm-product'
    })

    if (this.state.productId.length !== 0) {
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isSubmited !== prevState.isSubmited && this.state.nextRoute !== "" && this.state.productId !== 0) {
      this.props.history.push(this.state.nextRoute)
    }
  }

  addStock = (id, values) => {

    axios.post('/api/admin/add-product-sizes', {
      xs: values.xs,
      s: values.s,
      m: values.m,
      l: values.l,
      xl: values.xl,
      xxl: values.xxl,
      product_id: id
    })
  }


  render() {
    return (

      <div className="app">
        <Link to="/admin" className="login" type="submit"><img src={home} className="login" alt="order" /></Link>

        <h1 className="first_title">
          Add product
    </h1>

        <Formik
          initialValues={{
            name: '',
            price: '',
            EAN: '',
            type: '',
            color: '',
            image: '',
            xs: '',
            s: '',
            m: '',
            l: '',
            xl: '',
            xxl: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios.post('/api/admin/add-product', {
              name: values.name,
              price: values.price,
              EAN: values.EAN,
              type: values.type,
              color: values.color,
              image_1: values.image,
              seasons_id: 1
            })
              .then((response) => {
                if (response.status === 200) {
                  this.addStock(response.data.insertId, values)
                }
              })
              .then(response => {
                this.setState({
                  isSubmited: true
                })
              })


            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .min(2, 'Product name is longer than that')
              .required('Name is required.'),
            price: Yup.string()
              .min(1, 'Price is longer than that')
              .required('A price required.'),
            type: Yup.string()
              .required('Type of product is required'),
            image: Yup.string()
              .url('Invalid URL')
              .min(15, 'Need a correct URL'),
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
              <div className="admin_add_product_form_container">
                <form onSubmit={handleSubmit}>
                  <div className="admin_add_product_form_container">
                    <div className="admin_add_product_shop_info_container">
                      <h2>Product infos</h2>
                      <legend>Name</legend>
                      <input
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.name && touched.name
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.name && touched.name && (
                        <div className="admin_add_product_input-feedback">{errors.name}</div>
                      )}
                      <legend>Price</legend>
                      <input
                        id="price"
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.price && touched.price
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />

                      {errors.price && touched.price && (
                        <div className="admin_add_product_input-feedback">{errors.price}</div>
                      )}
                      <legend>EAN</legend>
                      <input
                        id="EAN"
                        type="text"
                        value={values.EAN}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.EAN && touched.EAN
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.EAN && touched.EAN && (
                        <div className="admin_add_product_input-feedback">{errors.EAN}</div>
                      )}
                      <legend>Type</legend>
                      <select
                        id="type"
                        type="text"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.type && touched.type
                            ? 'text-input error'
                            : 'text-input'
                        }>
                        <option value=""></option>
                        <option value="Caleçons">Caleçons</option>
                        <option value="Boxers">Boxers</option>
                        <option value="Woman">Woman</option>
                      </select>
                      {errors.type && touched.type && (
                        <div className="admin_add_product_input-feedback">{errors.type}</div>
                      )}
                      <legend>Color</legend>
                      <input
                        id="color"
                        type="text"
                        value={values.color}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.color && touched.color ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.color && touched.color && (
                        <div className="admin_add_product_input-feedback">{errors.color}</div>
                      )}
                      <legend>Image</legend>
                      <input
                        id="image"
                        type="text"
                        placeholder="URL of your image..."
                        value={values.image}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.image && touched.image ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.image && touched.image && (
                        <div className="admin_add_product_input-feedback">{errors.image}</div>
                      )}

                    </div>
                    <div className="admin_add_product_bill_and_delivery_container">

                      <div className="admin_add_product_bill_address_container">
                        <h2>Sizes</h2>
                        <legend>XS</legend>
                        <input
                          id="xs"
                          type="number"
                          className={
                            errors.xs && touched.xs
                              ? 'text-input error'
                              : 'text-input'
                          }
                          value={values.xs}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.xs && touched.xs && (
                          <div className="admin_add_product_input-feedback">{errors.xs}</div>
                        )}
                        <legend>S</legend>
                        <input
                          id="s"
                          type="number"
                          className={
                            errors.s && touched.s
                              ? 'text-input error'
                              : 'text-input'
                          }
                          value={values.s}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        {errors.s && touched.s && (
                          <div className="admin_add_product_input-feedback">{errors.s}</div>
                        )}
                        <legend>M</legend>
                        <input
                          id="m"
                          type="number"
                          value={values.m}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.m && touched.m ? 'text-input error' : 'text-input'
                          }
                        />
                        {errors.m && touched.m && (
                          <div className="admin_add_product_input-feedback">{errors.m}</div>
                        )}
                        <legend>L</legend>
                        <input
                          id="l"
                          type="number"
                          value={values.l}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.l && touched.l
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.l && touched.l && (
                          <div className="admin_add_product_input-feedback">{errors.l}</div>
                        )}
                        <legend>XL</legend>
                        <input
                          id="xl"
                          type="number"
                          value={values.xl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.xl && touched.xl
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.xl && touched.xl && (
                          <div className="admin_add_product_input-feedback">{errors.xl}</div>
                        )}
                        <legend>XXL</legend>
                        <input
                          id="xxl"
                          type="number"
                          value={values.xxl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.xxl && touched.xxl
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.xxl && touched.xxl && (
                          <div className="admin_add_product_input-feedback">{errors.xxl}</div>
                        )}


                      </div>

                    </div>
                  </div>
                  <div className="admin_add_product_button_container">
                    <div className="admin_add_product_button_reset">
                      <button
                        type="button"
                        className="button outline admin_add_product_button"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                      >
                        Reset
                  </button>
                    </div>
                    <div className="admin_add_product_button_submit">
                      <button className="button admin_add_product_button" type="submit" disabled={isSubmitting} >
                        Add product
                  </button>
                    </div>
                  </div>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>


    )
  }
};


export default withRouter(AddProduct);