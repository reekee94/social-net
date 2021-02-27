import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BankItem = ({
                       bank: {
                         user: { _id, name, avatar },
                         website,
                         location,
                         bio
                       }
                     }) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {bio} {website && <span> at {website}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          Edit Bank
        </Link>
        <Link to={`/profile/${_id}`} className='btn btn-danger'>
          Delete Bank
        </Link>
      </div>
      {/*<ul>*/}
      {/*  {skills.slice(0, 4).map((skill, index) => (*/}
      {/*    <li key={index} className='text-primary'>*/}
      {/*      <i className='fas fa-check' /> {skill}*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
};

BankItem.propTypes = {
  bank: PropTypes.object.isRequired
};

export default BankItem;
