import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCostumerToDb, getCustomers } from "../../db/actions";
import { containsDuplicate } from "../../utils/containsDuplicate";
import LayoutStyle from "../../components/LayoutStyle";
import CustomerCard from "../../components/cards/CustomerCard";
import { useCustomerStore } from "../../store/customerStore";
import { CreateCustomerModal } from "../../components/modals/CreateCustomerModal";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";
import { PlusButton } from "../../components/buttons/PlusButton";
import { StatusFilter } from "../../components/inputs/StatusFilter";
import { Flex } from "../../components/wrappers/Flex";
import MainWrapper from "../../components/wrappers/MainWrapper";

export default () => {
  const customers = useCustomerStore(state => state.customers);
  const fetchCustomers = useCustomerStore(state => state.fetchCustomers);
  const [ showModal, setShowModal ] = useState( false );

  useEffect(() => {
    fetchCustomers();
    console.log('customers: ', customers)
  }, []);

  return (
    <MainWrapper>
      <h1>Costumers</h1>
      <Flex flexDirection={ 'row' } justifyContent={ 'space-between' }
            alignItems={ 'center' }>

        <PlusButton onClick={ () => setShowModal( true ) }/>
      </Flex>
      <LayoutStyle>
        {customers.map((customer, index) => {
          return <CustomerCard index={index} customer={customer} />;
        })}
      </LayoutStyle>

      <CreateCustomerModal show={ showModal } onHide={ () => {
        setShowModal( false );
        fetchCustomers();
      } }/>


    </MainWrapper>


  );
};
