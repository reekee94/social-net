import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Login from "../auth/Login";
import PropTypes from 'prop-types'



const Landing = ({isAuthenticated}) => {
  if(isAuthenticated) {
    <Redirect to={'/dashboard'}/>
  }

    return (
      <section className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated:  state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
