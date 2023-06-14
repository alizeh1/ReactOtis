import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";

function SideMenu() {
    const { collapseSidebar } = useProSidebar();

    return (
        <div id="sidemenu" style={({ height: "100vh" }, { display: "flex" })}>
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Admin</h2>
                    </MenuItem>

                    <MenuItem icon={<HomeOutlinedIcon />} to="/">Dashboard</MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon />} to="/country">Groups</MenuItem>
                    <MenuItem icon={<ContactsOutlinedIcon />} to="/fetch-data">Users</MenuItem>
                    <MenuItem icon={<ReceiptOutlinedIcon />} to="/department">Forms</MenuItem>
                </Menu>
            </Sidebar>
            <main>

            </main>
        </div>
    );
}

export default SideMenu;