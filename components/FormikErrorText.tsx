import React from 'react';

const FormikErrorText: React.FC = ({ children }) => {
  return (
    <p className="text-sm text-red-500">{children}</p>
  )
}
export default FormikErrorText