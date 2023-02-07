import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "./utils/interact";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Squirrelly</h1>
            {/* <div className="links">
                <button onClick={connectWalletPressed} style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                    }}>
                    {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                    ) : (
                    <span>Connect Wallet</span>
                    )}
                </button>
            </div> */}
        </nav>
    );
}
 
export default Navbar;