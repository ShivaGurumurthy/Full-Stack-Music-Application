import ReactDOM from "react-dom/client"
import React from "react"
import App from "./App"
import "./global.css"
import AuthProvider from "./Context/AuthContext"
import UserProvider from "./Context/UserContext"
import AlbumProvider from "./Context/AlbumContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <UserProvider>
            <AlbumProvider>
                <App/>
            </AlbumProvider>
        </UserProvider>
    </AuthProvider>
)