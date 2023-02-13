import { useEffect } from "react";
import { connectWallet, getCurrentWalletConnected } from "./utils/interact";

const Navbar = (props) => {
    
    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected();

        props.setWallet(address);
        props.setStatus(status);

        addWalletListener();
    }, []);
    
    function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              props.setWallet(accounts[0]);
              props.setStatus("👆🏽 Write a message in the text-field above.");
            } else {
              props.setWallet("");
              props.setStatus("🦊 Connect to Metamask using the top right button.");
            }
          });
        } else {
          props.setStatus(
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          );
        }
    }

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        props.setStatus(walletResponse.status);
        props.setWallet(walletResponse.address);
    };



    return (
        <nav className="navbar">
            <h1>Squirrelly</h1>
            <div className="links">
                <button onClick={connectWalletPressed} style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                    }}>
                    {props.walletAddress.length > 0 ? (
                    "Connected: " +
                    String(props.walletAddress).substring(0, 6) +
                    "..." +
                    String(props.walletAddress).substring(38)
                    ) : (
                    <span>Connect Wallet</span>
                    )}
                </button>
            </div>
        </nav>
    );
}
 
export default Navbar;