import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCostumerToDb, getCostumers } from "../../db/actions";
import { containsDuplicate } from "../../utils/containsDuplicate";
import LayoutStyle from "../../components/LayoutStyle";
import CustomerCard from "../../components/cards/CustomerCard";

export default () => {
  const [costumers, setCostumers] = useState([]);
  const [costumer, setCostumer] = useState({ name: "" });

  const fetchProjects = async () => {
    const fromDb = await getCostumers();
    fromDb.sort((a, b) => a.id < b.id);
    console.log(fromDb);

    setCostumers([...fromDb]);
  };

  function handleSubmit() {
    return async (e) => {
      e.preventDefault();
      if (containsDuplicate(costumers, "name", costumer.name)) {
        return alert("Costumer exists!");
      }
      await addCostumerToDb(costumer);
      setCostumers([costumer, ...costumers]);
      setCostumer({ name: "" });
    };
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h4>Costumers:</h4>
      <LayoutStyle>
        {costumers.map((customer) => {
          return <CustomerCard customer={customer} />;
        })}
      </LayoutStyle>
      <form onSubmit={handleSubmit()}>
        <h3>Add new costumer</h3>
        <label htmlFor={"costumerName"}>
          {" "}
          Customer name:
          <input
            value={costumer.name}
            required
            onChange={(e) => setCostumer({ ...costumer, name: e.target.value })}
          />
        </label>
        <input type={"submit"} value={"Add new costumer"} />
      </form>
    </div>
  );
};
