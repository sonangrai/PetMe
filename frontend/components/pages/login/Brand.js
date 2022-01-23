import React from "react";
import styled from "styled-components";

const PetBanner = styled.div`
  font-family: ${({ theme }) => theme.brandFont};
  font-size: 3em;
  text-align: center;
`;

const Brand = () => {
  return <PetBanner>PetMe</PetBanner>;
};

export default Brand;
