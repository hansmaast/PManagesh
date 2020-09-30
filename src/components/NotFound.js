import React from "react";
import MainWrapper from "./wrappers/MainWrapper";

export default () => {
    return (
        <MainWrapper>
          <h3 className={'mx-auto'}>
            This page does not exist..<span role={"img"} aria-label={'sad emoji'}></span>😵
          </h3>
        </MainWrapper>
    );
}