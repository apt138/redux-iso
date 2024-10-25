import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function CreateCustomer() {
  const [fullname, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const dispatch = useDispatch();

  function handleCreate() {
    if (!fullname || !nationalId) return;
    dispatch(createCustomer(fullname, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label htmlFor="name">Customer Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="national-id">National ID</label>
          <input
            type="text"
            id="national-id"
            placeholder="SDF12662"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default CreateCustomer;
