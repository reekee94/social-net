import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getBanks } from '../../actions/bank';
import BankItem from "./MorgtageItem";

const Banks = ({ getBanks, bank: { banks, loading } }) => {
  useEffect(() => {
    getBanks();
  }, [getBanks]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Banks</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {banks.length > 0 ? (
              banks.map(bank => (
                <BankItem key={bank._id} bank={bank} />
              ))
            ) : (
              <h4>No bank found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Banks.propTypes = {
  getBanks: PropTypes.func.isRequired,
  bank: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bank: state.bank
});

export default connect(
  mapStateToProps,
  { getBanks }
)(Banks);
