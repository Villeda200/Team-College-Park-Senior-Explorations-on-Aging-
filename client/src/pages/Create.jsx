import React, { useState } from "react";

const Create = () => {
  const [pantries, setPantries] = useState({
    orgName: "",
    streetAdd: "",
    state: "",
    zipCode: "",
  });

  return (
    <div className="form">
      <h1>Create New Organization</h1>
      <input type="text" placeholder="Organization Name" />
      <input type="text" placeholder="Street Address (E.g: 12345 ABC St" />
      <input type="text" placeholder="State (E.g: MD)" />
      <input type="number" placeholder="Zip Code (E.g 12345)" />
      <input type="text" placeholder="" />
    </div>
  );
};

export default Create;
