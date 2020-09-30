import React, { useEffect, useState } from "react";
import CustomerCard from "../../components/cards/CustomerCard";
import { useCustomerStore } from "../../store/customerStore";
import { CreateCustomerModal } from "../../components/modals/CreateCustomerModal";
import { PlusButton } from "../../components/buttons/PlusButton";
import { Flex } from "../../components/wrappers/Flex";
import MainWrapper from "../../components/wrappers/MainWrapper";
import NoMatchOrEmpty from "../../components/alerts/NoMatchOrEmpty";

export default () => {
  const filteredCustomers = useCustomerStore( state => state.filteredCustomers );
  const fetchCustomers = useCustomerStore( state => state.fetchCustomers );
  const [ showModal, setShowModal ] = useState( false );

  useEffect( () => {
    fetchCustomers();
  }, [] );

  return (
      <MainWrapper>
        <h1>Costumers</h1>
        <Flex flexDirection={ 'row' } justifyContent={ 'space-between' }
              alignItems={ 'center' }>

          <PlusButton onClick={ () => setShowModal( true ) }/>
        </Flex>
        <Flex flexWrap={ 'wrap' } justifyContent={ 'center' }>
          { filteredCustomers.length === 0 && (
              <NoMatchOrEmpty/>
          ) }
          { filteredCustomers.map( ( customer, index ) => {
            return <CustomerCard index={ index } customer={ customer }/>;
          } ) }
        </Flex>

        <CreateCustomerModal show={ showModal } onHide={ () => {
          setShowModal( false );
          fetchCustomers();
        } }/>


      </MainWrapper>


  );
};
