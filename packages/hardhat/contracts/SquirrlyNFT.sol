//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SquirrlyNFT is ERC721, ERC721URIStorage, Pausable, AccessControl{
    using Counters for Counters.Counter;

    bytes32 public constant DEV_ROLE = keccak256("DEV_ROLE");

    mapping (uint256 => uint256) public lastQuest;
    mapping (uint256 => bool) public isQuestComplete;

    //KNOWN ISSUE: this mapping needs to be updated upon transfer
    mapping (address => uint256) public addressLookup;


    Counters.Counter public tokenIdCounter;

    constructor(address[] memory devs) ERC721("Squirrly", "SQRL") {
        for (uint256 i = 0; i < devs.length; ++i) {
            _grantRole(DEFAULT_ADMIN_ROLE, devs[i]);
        }
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE){
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE){
        _unpause();
    }


    function safeMint(address to, string memory URI) public payable{
        require (balanceOf(to) == 0, "You already have a Squirrly");
        require (to == msg.sender, "You can only mint a Squirrly for yourself");
        uint256 tokenId = tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, URI);
        lastQuest[tokenId] = 0;
        isQuestComplete[tokenId] = true;
        addressLookup[to] = tokenId;
        tokenIdCounter.increment();
    }

    // function getLastQuest(uint256 tokenId) public view returns (uint256){
    //     return lastQuest[tokenId];
    // }

    function finishQuest(string memory newURI, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "You are not the owner of this Squirrly");
        _setTokenURI(tokenId, newURI);
        lastQuest[tokenId] = block.number;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    receive() external payable {
    }

    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE){
        payable(msg.sender).transfer(address(this).balance);
    }

}