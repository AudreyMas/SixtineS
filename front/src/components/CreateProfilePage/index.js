import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './index.scss';
import {connect} from 'react-redux';


Yup.addMethod(Yup.mixed, 'sameAs', function mes(ref, message) {
  return this.test('sameAs', message, function mess(value) {
    const other = this.resolve(ref);
    return !other || !value || value === other;
  });
});

const CreateProfilePage = props => (
  <div className="add_customer_body">
    <h1 className="first_title">
      Account creation
    </h1>

    <Formik
      initialValues={{
        login: 'wcsTest@unMail.com',
        password: '123456',
        name_shop: 'Wild Code School',
        name_manager: 'François',
        birthday: '1906-02-01',
        phone: '000000000',
        mail: 'wcsTest@unMail.com',
        language: 'FR',
        company_name: 'WCSCompany',
        address_street_fac: '5 place St Gudule',
        address_cp_fac: '1200',
        address_city_fac: 'Bruxelles',
        address_country_fac: 'Belgique',
        tva_fac: 'BE01545455',
        address_street_liv: '5 place St Gudule',
        address_cp_liv: '1200',
        address_city_liv: 'Bruxelles',
        address_country_liv: 'France',
        passwordVerification: '123456',
      }}
      onSubmit={(values, { setSubmitting }) => {
       
        axios.post('/api/profile/sign-up', {
          login: values.mail,
          password: values.password,
          name_shop: values.name_shop,
          name_manager: values.name_manager,
          birthday: values.birthday,
          phone: values.phone,
          mail: values.mail,
          language: values.language,
          company_name: values.company_name,
          address_street_fac: values.address_street_fac,
          address_cp_fac: values.address_cp_fac,
          address_city_fac: values.address_city_fac,
          address_country_fac: values.address_country_fac,
          tva_fac: values.tva_fac,
          address_street_liv: values.address_street_liv,
          address_cp_liv: values.address_cp_liv,
          address_city_liv: values.address_city_liv,
          address_country_liv: values.address_country_liv,
          sales_id: props.state.id,
        });
        setSubmitting(false);
        props.history.push('/confirm/confirm-customer');
      }}
      validationSchema={Yup.object().shape({
        name_shop: Yup.string()
          .min(2, 'your name-shop is longer than that')
          .required('Shop name is required.'),
        name_manager: Yup.string()
          .min(2, 'your name-manager is longer than that')
          .required('Manager name is required.'),
        phone: Yup.string()
          .min(9, 'Your phone number need to be longer than that')
          .required('Phone number is required.'),
        birthday: Yup.string()
          .required('Your birthday is required'),
        mail: Yup.string()
          .email('Invalid email address')
          .required('Email is required!'),
        language: Yup.string()
          .min(2, 'your language is longer than that')
          .required('Your language is required.'),
        company_name: Yup.string()
          .min(2, 'your company_name is longer than that')
          .required('Your Company need to have a name.'),
        address_street_fac: Yup.string()
          .min(2, 'your Address is longer than that')
          .required('Address is required.'),
        address_cp_fac: Yup.string()
          .min(2, 'your postal code is longer than that')
          .required('Your Postal Code is required.'),
        address_city_fac: Yup.string()
          .min(2, 'your city is longer than that')
          .required('Your City is required.'),
        password: Yup.string()
          .min(5, 'Your password need to be longer than that')
          .required('Password is required.'),
        passwordVerification: Yup.string()
          .sameAs(Yup.ref('password'), 'The password doesn\'t match the verification password')
          .required('The password doesn\'t match the verification password'),
        address_country_fac: Yup.string()
          .min(2, 'your Country is longer than that')
          .required('Your Country is required.'),
        tva_fac: Yup.string()
          .min(10, 'your VAT is longer than that')
          .required('Your VAT number is required.'),
        address_street_liv: Yup.string()
          .min(2, 'your Address is longer than that')
          .required('Address is required.'),
        address_cp_liv: Yup.string()
          .min(2, 'your Postal code is longer than that')
          .required('Your Postal Code is required.'),
        address_city_liv: Yup.string()
          .min(2, 'your city is longer than that')
          .required('Your City is required.'),
        address_country_liv: Yup.string()
          .min(2, 'your country is longer than that')
          .required('Your Country is required.'),
      })}
    >
      {(props2) => {
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
        } = props2;
        return (
          <div className="form_container">
            <form onSubmit={handleSubmit}>
              <div className="form_container">
                <div className="shop_info_container">
                  <h2 className="add_customer_title2">Shop infos</h2>
                  <legend className="add_customer_legend">Name of the shop</legend>
                  <input
                    id="name_shop"
                    type="text"
                    value={values.name_shop}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="add_customer_input"
                  />
                  {errors.name_shop && touched.name_shop && (
                    <div className="input-feedback">{errors.name_shop}</div>
                  )}
                  <legend className="add_customer_legend">Name of the shop manager</legend>
                  <input
                    id="name_manager"
                    type="text"
                    value={values.name_manager}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="add_customer_input"
                  />

                  {errors.name_manager && touched.name_manager && (
                    <div className="input-feedback">{errors.name_manager}</div>
                  )}
                  <legend className="add_customer_legend">Birthday of shop manager</legend>
                  <input
                    id="birthday"
                    type="date"
                    value={values.birthday}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="add_customer_input"
                  />
                  {errors.birthday && touched.birthday && (
                    <div className="input-feedback">{errors.birthday}</div>
                  )}
                  <legend className="add_customer_legend">Phone number</legend>
                  <input
                    id="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="add_customer_input"
                  />
                  {errors.phone && touched.phone && (
                    <div className="input-feedback">{errors.phone}</div>
                  )}
                  <legend className="add_customer_legend">E-Mail</legend>
                  <input
                    id="mail"
                    type="email"
                    value={values.mail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="add_customer_input"
                  />
                  {errors.mail && touched.mail && (
                    <div className="input-feedback">{errors.mail}</div>
                  )}
                  <legend className="add_customer_legend">Password</legend>
                  <input
                    id="password"
                    type="password"
                    className="add_customer_input"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <legend className="add_customer_legend">Password verification</legend>
                  <input
                    id="passwordVerification"
                    type="password"
                    className="add_customer_input"
                    value={values.passwordVerification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.passwordVerification && touched.passwordVerification && (
                    <div className="input-feedback">{errors.passwordVerification}</div>
                  )}
                  <legend className="add_customer_legend">Language</legend>
                  <select
                    id="language"
                    type="text"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="add_customer_dropdown"
                  >
                    <option value="" />
                    <option value="FR">FR</option>
                    <option value="EN">EN</option>
                    <option value="NL">NL</option>
                  </select>
                  {errors.language && touched.language && (
                    <div className="input-feedback">{errors.language}</div>
                  )}

                </div>
                <div className="bill_and_delivery_container">

                  <div className="bill_address_container">
                    <h2>Bill Address</h2>
                    <legend className="add_customer_legend">Company name</legend>
                    <input
                      id="company_name"
                      type="text"
                      value={values.company_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.company_name && touched.company_name && (
                      <div className="input-feedback">{errors.company_name}</div>
                    )}
                    <legend className="add_customer_legend">Street + N°</legend>
                    <input
                      id="address_street_fac"
                      type="text"
                      value={values.address_street_fac}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.address_street_fac && touched.address_street_fac && (
                      <div className="input-feedback">{errors.address_street_fac}</div>
                    )}
                    <legend className="add_customer_legend">Postal code</legend>
                    <input
                      id="address_cp_fac"
                      type="number"
                      value={values.address_cp_fac}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.address_cp_fac && touched.address_cp_fac && (
                      <div className="input-feedback">{errors.address_cp_fac}</div>
                    )}
                    <legend className="add_customer_legend">City</legend>
                    <input
                      id="address_city_fac"
                      type="text"
                      value={values.address_city_fac}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.address_city_fac && touched.address_city_fac && (
                      <div className="input-feedback">{errors.address_city_fac}</div>
                    )}
                    <legend className="add_customer_legend">Country</legend>
                    <select
                      id="address_country_fac"
                      type="text"
                      value={values.address_country_fac}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_dropdown"
                    >
                      <option value="" />
                      <option value="Belgique">Belgique</option>
                      <option value="France">France</option>
                    </select>
                    {errors.address_country_fac && touched.address_country_fac && (
                      <div className="input-feedback">{errors.address_country_fac}</div>
                    )}
                    <legend className="add_customer_legend">VAT</legend>
                    <input
                      id="tva_fac"
                      type="text"
                      value={values.tva_fac}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.tva_fac && touched.tva_fac && (
                      <div className="input-feedback">{errors.tva_fac}</div>
                    )}
                  </div>

                  <div className="delivery_address_container">
                    <h2>Delivery Address</h2>
                    <legend className="add_customer_legend">Street + N°</legend>
                    <input
                      id="address_street_liv"
                      type="text"
                      value={values.address_street_liv}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.address_street_liv && touched.address_street_liv && (
                      <div className="input-feedback">{errors.name_shop}</div>
                    )}
                    <legend className="add_customer_legend">Postal code</legend>
                    <input
                      id="address_cp_liv"
                      type="number"
                      value={values.address_cp_liv}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.address_street_liv && touched.address_street_liv && (
                      <div className="input-feedback">{errors.address_street_liv}</div>
                    )}
                    <legend className="add_customer_legend">City</legend>
                    <input
                      id="address_city_liv"
                      type="text"
                      value={values.address_city_liv}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_input"
                    />
                    {errors.address_city_liv && touched.address_city_liv && (
                      <div className="input-feedback">{errors.address_city_liv}</div>
                    )}
                    <legend className="add_customer_legend">Country</legend>
                    <select
                      id="address_country_liv"
                      type="text"
                      value={values.address_country_liv}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="add_customer_dropdown"
                    >
                      <option value="" />
                      <option value="Belgique">Belgique</option>
                      <option value="France">France</option>
                    </select>
                    {errors.address_country_liv && touched.address_country_liv && (
                      <div className="input-feedback">{errors.address_country_liv}</div>
                    )}
                  </div>

                </div>
              </div>
              <div className="button_container">
                
                  <button
                    type="submit"
                    className="button button_reset"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}>
                    Reset
                  </button>
                  <button 
                  type="submit" 
                  className="button button_submit" 
                  disabled={isSubmitting}>
                    Create
                  </button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  </div>
);

const mapStateToProps = state => ({
  state: state.saveIdLogin[0],
});


export default connect(mapStateToProps)(CreateProfilePage);
