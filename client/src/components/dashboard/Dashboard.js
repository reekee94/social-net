import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {deleteAccount, getBanks} from "../../actions/bank";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Banks from "../banks/Banks";


const Dashboard = ({getBanks, deleteAccount, auth: {user}, bank: {banks, loading}}) => {
  useEffect(()=>{
    getBanks()
  }, [])
  return loading && banks === null ? (<Spinner />) : (
    <Fragment>
      <h1 className={'large text-primary'}>Bank options</h1>
      <p className={'lead'}>
        <i className={'fas fa-user'}/>Welcome {user && user.name}
      </p>
      {banks !== null ? (
        <Fragment>
          <Education loan={banks}/>
          HERE
          <Banks />

          <div className={"my-2"}>
            <button className={"btn btn-danger"} onClick={() => deleteAccount()}>
              <i className={"fas fa-user-minus"}></i> Delete my account
            </button>
          </div>
        </Fragment>
        ) : (
          <Fragment> <p>
            Create and calculate mortgage for your personal needs.
          </p>
          <Link to={'/create-bank'} className={'btn btn-primary my-1'}> Create bank </Link>
          <Link to={'/create-mortgage'} className={'btn btn-warning'}> Create mortgage </Link>
          </Fragment>
          )}
    </Fragment>
  )
};

Dashboard.propTypes = {
  getBanks: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  bank: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
  auth: state.auth,
  user: state.user,
  bank: state.bank
})

export default connect(mapStateToProps, {getBanks, deleteAccount})(Dashboard);
