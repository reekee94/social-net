import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBankById } from '../../actions/bank';

const BankItem = ({
                       bank: {
                         bank_name,
                         min_loan,
                         max_loan,
                         min_down_payment,
                         interest_rate,
                         mortgages,
                         _id
                       },
                     }) => {
  return (
    <div className='bank bg-light'>
      <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAgPXly3ipSNd0iaAjC1Pvd2Ent_00E09skQ&usqp=CAU'} alt='' className='round-img' />
      <div>
        <h2>{bank_name}</h2>
        <p>
          {bank_name} {min_loan && <span> at {max_loan}</span>}
        </p>
        <p className='my-1'>{min_down_payment && <span>{interest_rate}</span>}</p>
        <Link to={`/bank/${_id}`} className='btn btn-primary'>
          Edit Bank
        </Link>
        <Link to={`/bank/${_id}`} className='btn btn-danger'>
          Remove Bank
        </Link>
      </div>
      <ul>
        {mortgages.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

BankItem.propTypes = {
  bank: PropTypes.object.isRequired
};

export default BankItem;
