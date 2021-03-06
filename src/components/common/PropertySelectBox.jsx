import React from "react";
import {useFormikContext,ErrorMessage} from "formik";
import Error from "../forms/Error";

function PropertySelectBox({label, name, options}) {
  const {values, handleChange} = useFormikContext();

  return (
    <React.Fragment>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select
        style={{cursor: "pointer"}}
        name={name}
        value={values[name]}
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ErrorMessage name={name} component={Error} />
    </React.Fragment>
  );
}

export default PropertySelectBox;
