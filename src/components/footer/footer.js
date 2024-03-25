import React from "react";
//import { footer } from "./footer_elements";
 
const Footer = () => {
    const myFooter = {
        marginTop: "150px",
        width: "100%",
        padding: "25px",
        background: "#c5c2c1",
        color: "#000000",
        display: "flex",
        textAlign: "center",
        position: "fixed",
        left: 0,
        bottom: 0
    };

    const col_1 = {
        flexGrow: 2
    };

    const headers = {
        fontWeigth: 300,
        marginBottom: "30px",
        letterSpacing: "1px"
    };

    const links = {
        display: "block",
        textDecoration: "none",
        color: "#000000",
        marginBottom: "10px"
    };
    return (
        <div style={myFooter}>
            <div style={col_1}>
                <h3 style={headers}>USEFUL LINKS</h3>
                <a href="https://www.aldebaran.com/en/nao" style={links}>Nao Robot</a>
                <a href="https://www.aldebaran.com/en" style={links}>Aldebaran</a>
                <a href="#" style={links}>GitHub Repository</a>
            </div>
            <div style={col_1}>
                <h3>CONTACT</h3>
                <p style={links}>ouremail@example.com</p>
                <p style={links}>(000)-000-0000</p>
                <p style={links}>1450 Jayhawk Blvd. Lawrence, KS 66045</p>
            </div>
        </div>

    );
};
 
export default Footer;