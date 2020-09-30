import React from "react";
import Employees from "../employees/Employees";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ScaleOnHover } from "../../components/effects/ScaleOnHover";
import MainWrapper from "../../components/wrappers/MainWrapper";


const Scaleotron = ( { linkTo, title, text, buttonText } ) => {

  return (
      <ScaleOnHover ms={ 100 } scaleTo={ 1.02 }>
        <Link to={ linkTo } style={ { textDecoration: 'none', width: 'fit-content'} }>
          <Jumbotron className={'mx-auto'} style={ { textDecoration: 'none', maxWidth: 700 } }>
            <h1>{ title }</h1>
            <p>
              { text }
            </p>
            <p>
              <Button variant="primary">{ buttonText }</Button>
            </p>
          </Jumbotron>
        </Link>
      </ScaleOnHover>
  );
}

export default () => {



  return (
      <>
          <MainWrapper>
            <Scaleotron
                title={ 'Projects' }
                text={ 'Check out your current projects, or create a new one.' }
                linkTo={ '/projects' }
                buttonText={ 'Go!' }
            />

            <Scaleotron
                title={ 'Employees' }
                text={ 'Do you need to get an overview of your employees?' }
                linkTo={ '/employees' }
                buttonText={ 'Go!' }
            />

            <Scaleotron
                title={ 'Customers' }
                text={ 'Weve also got hold of your customers. Check them out here!' }
                linkTo={ '/customers' }
                buttonText={ 'Go!' }
            />
          </MainWrapper>
      </>
  );
};
