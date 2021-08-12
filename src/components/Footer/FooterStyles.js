import styled from "styled-components";

export const Box = styled.div`
  padding: 78px 0px;
  background: #343a40;
  position: absolute;
  bottom: 0;
  width: 100%;
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-family: "Karla", sans-serif
  font-size: 1.2rem;
  text-decoration: none;
  ${
    "" /* &:hover {
    color: blue;
    transition: 200ms ease-in;
  } */
  }
`;

export const Heading = styled.p`
  font-family: "Ubuntu", sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;
