import React from 'react';

const Filter = ({ filter, handleFilter}) => {
  return (
    <div>
      Filter
      <input type='text' onChange={handleFilter} value={filter} />
    </div>
  );
};

export default Filter;
