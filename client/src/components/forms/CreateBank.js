import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBank, getBankById} from '../../actions/bank';

const initialState = {
  bank_name: '',
  website: '',
  location: '',
  bio: '',
  loan_term: '',
  interest_rate: '',
  max_loan: '',
  min_down_payment: '',
}

const CreateBank =({
                        bank: { bank, loading },
                        history,
                        createBank,
  getBankById, match
}) => {
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if(!bank) getBankById(match.params.id);
    if (!loading && match.params.id) {
      const profileData = { ...initialState };
      for (const key in bank) {
        if (key in profileData) profileData[key] = bank[key];
      }
      if (Array.isArray(profileData.loans))
        profileData.loans = profileData.loans.join(', ');

      setFormData(profileData);
    }
  }, [loading, bank, getBankById]);

  const {
    bank_name,
    website,
    location,
    bio,
    loan_term,
    interest_rate,
    max_loan,
    min_down_payment,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createBank(formData, history, bank ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Banks</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your bank
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        {/*<div className="form-group">*/}
        {/*  <select name="status" value={status} onChange={onChange}>*/}
        {/*    <option>* Select Professional Status</option>*/}
        {/*    <option value="Developer">Developer</option>*/}
        {/*    <option value="Junior Developer">Junior Developer</option>*/}
        {/*    <option value="Senior Developer">Senior Developer</option>*/}
        {/*    <option value="Manager">Manager</option>*/}
        {/*    <option value="Student or Learning">Student or Learning</option>*/}
        {/*    <option value="Instructor">Instructor or Teacher</option>*/}
        {/*    <option value="Intern">Intern</option>*/}
        {/*    <option value="Other">Other</option>*/}
        {/*  </select>*/}
        {/*  <small className="form-text">*/}
        {/*    Give us an idea of where you are at in your career*/}
        {/*  </small>*/}
        {/*</div>*/}
        <div className="form-group">
          <input
            type="text"
            placeholder="Banks name"
            name="bank_name"
            value={bank_name}
            onChange={onChange}
          />
          <small className="form-text">
            Enter for a banks name
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">
            Faster access website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            Country & city suggested (eg. Ukraine, Lviv)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*  Loan term"
            name="loan_term"
            value={loan_term}
            onChange={onChange}
          />
          <small className="form-text">
            ?
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Interest rate"
            name="interest_rate"
            value={interest_rate}
            onChange={onChange}
          />
          <small className="form-text">
            Please enter
          </small>
        </div><div className="form-group">
        <input
          type="text"
          placeholder="* Maximum loan"
          name="max_loan"
          value={max_loan}
          onChange={onChange}
        />
        <small className="form-text">
          Please enter
        </small>
      </div><div className="form-group">
        <input
          type="text"
          placeholder="* Minimum down payment"
          name="min_down_payment"
          value={min_down_payment}
          onChange={onChange}
        />
        <small className="form-text">
          Please use
        </small>
      </div>
        <div className="form-group">
          <textarea
            placeholder="A short history of bank"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        {/*<div className="my-2">*/}
        {/*  <button*/}
        {/*    onClick={() => toggleSocialInputs(!displaySocialInputs)}*/}
        {/*    type="button"*/}
        {/*    className="btn btn-light"*/}
        {/*  >*/}
        {/*    Add More Information*/}
        {/*  </button>*/}
        {/*  <span>Optional</span>*/}
        {/*</div>*/}

        {/*{displaySocialInputs && (*/}
        {/*  <Fragment>*/}
        {/*    <div className="form-group social-input">*/}
        {/*      <i className="fab fa-twitter fa-2x" />*/}
        {/*      <input*/}
        {/*        type="text"*/}
        {/*        placeholder="Twitter URL"*/}
        {/*        name="twitter"*/}
        {/*        value={twitter}*/}
        {/*        onChange={onChange}*/}
        {/*      />*/}
        {/*    </div>*/}

        {/*    <div className="form-group social-input">*/}
        {/*      <i className="fab fa-facebook fa-2x" />*/}
        {/*      <input*/}
        {/*        type="text"*/}
        {/*        placeholder="Facebook URL"*/}
        {/*        name="facebook"*/}
        {/*        value={facebook}*/}
        {/*        onChange={onChange}*/}
        {/*      />*/}
        {/*    </div>*/}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateBank.propTypes = {
  createBank: PropTypes.func.isRequired,
  getBankById: PropTypes.func.isRequired,
  bank: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  bank: state.bank
});

export default connect(mapStateToProps, { createBank, getBankById })(
  CreateBank
);
