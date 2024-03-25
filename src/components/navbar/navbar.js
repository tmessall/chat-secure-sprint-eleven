import React from "react";
import { Nav, NavLink, NavMenu } from "./navbar_elements";
 
const Navbar = () => {
    return (
        <div style={{textAlign:"center"}}>
            <Nav>
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/about_project" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/video_feed" activeStyle>
                        Live Video
                    </NavLink>
                    <NavLink to="/code_it" activeStyle>
                        Code It
                    </NavLink>
                </NavMenu>
            </Nav>
        </div>
    );
};
 
export default Navbar;