import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css"


export default function Layout({ children }) {
    return (
        <div className="app-layout">
            <Sidebar/>
            <div className="content-wrapper">
                <Header/>
                <main>{children}</main>
            </div>
        </div>
    );
}