import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <Box className="box">
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "-50px",
          marginBottom: "30px",
        }}
      >
        Covid Combatants
      </h1>
      <Container>
        <Row className="row">
          {/* <Column>
            <Heading>Supratim</Heading>
            <FooterLink
              className="linkedin"
              href="https://www.linkedin.com/in/supratim-majumder-53942a143/"
            >
              <AiFillLinkedin /> Linkedin
            </FooterLink>
            <FooterLink className="github" href="https://github.com/Supratim30">
              <AiFillGithub /> Github
            </FooterLink>
          </Column> */}
          <Column>
            {/* <Heading>Supratim</Heading>
            <FooterLink
              className="linkedin"
              href="https://www.linkedin.com/in/supratim-majumder-53942a143/"
            >
              <AiFillLinkedin /> Linkedin
            </FooterLink> */}
            <Heading>Mayank</Heading>
            <FooterLink
              className="linkedin"
              href="https://www.linkedin.com/in/mayank-agarwal-81b690196/"
            >
              <AiFillLinkedin /> Linkedin
            </FooterLink>
            <FooterLink className="github" href="https://github.com/mayankag30">
              <AiFillGithub /> Github
            </FooterLink>
            {/* <FooterLink href="#">Coding</FooterLink>
			<FooterLink href="#">Teaching</FooterLink> */}
          </Column>
          <Column>
            <Heading>Karthik</Heading>
            <FooterLink
              className="linkedin"
              href="https://www.linkedin.com/in/krishna-shedbalkar-5a022018b/"
            >
              <AiFillLinkedin /> Linkedin
            </FooterLink>
            <FooterLink
              className="github"
              href="https://github.com/krishnashed"
            >
              <AiFillGithub /> Github
            </FooterLink>
            {/* <FooterLink href="#">Indore</FooterLink>
			<FooterLink href="#">Mumbai</FooterLink> */}
          </Column>
          <Column>
            <Heading>Abhay</Heading>
            <FooterLink
              className="linkedin"
              href="https://www.linkedin.com/in/abhay-h-kashyap/"
            >
              <AiFillLinkedin /> Linkedin
            </FooterLink>
            <FooterLink
              className="github"
              href="https://github.com/abhayhk2001"
            >
              <AiFillGithub /> Github
            </FooterLink>
            {/* <FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink> */}
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
