import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import {connect} from "react-redux";
//import {deleteEducation} from "../../actions/bank";

const Loan = ({loan, deleteLoan}) => {
  const loans = loan.map( l => (
    <tr key={l._id}>
      <td>{l.name}</td>
      <td>{l.init_loan}</td>
      <td>{l.down_payment}</td>
      <td className={"hide-sm"}>{l.month}</td>
      {/*<td><Moment format='YYYY/MM/DD'>{l.from}</Moment> - {*/}
      {/*  l.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{l.to}</Moment>)*/}
      {/*}</td>*/}
      <td> {l.month}</td>
      <td>
        <button onClick={() => "deleteEducation(l._id)"} className={'btn btn-danger'}>Delete</button>
      </td>
      <td>
      <button onClick={() => "deleteEducation(l._id)"} className={'btn btn-danger'}>Edit</button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className={'my-2'}>Loan History</h2>
      <table className={'table'}>
        <thead>
        <tr>
          <th>Month</th>
          <th className={'hide-sm'}>Total payment</th>
          <th className={'hide-sm'}>Interest payment</th>
          <th className={'hide-sm'}>Loan Balance</th>
          <th className={'hide-sm'}>Equity</th>
        </tr>
        </thead>
        <tbody>{loans}</tbody>
      </table>
    </Fragment>
  );
};

Loan.propTypes = {
  loan: PropTypes.array.isRequired,
  //deleteLoan: PropTypes.func.isRequired,
};

export default connect(null, {})(Loan);
