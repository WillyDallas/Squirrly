//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SquirrlyNFT is ERC721, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    mapping (uint256 => uint256) public lastQuest;

    //KNOWN ISSUE: this mapping needs to be updated upon transfer
    mapping (address => uint256) public addressLookup;


    Counters.Counter public tokenIdCounter;

    constructor(address[] memory whiteList) ERC721("Squirrly", "SQRL") {
        for (uint i=0; i < whiteList.length; i++){
            safeMint(whiteList[i], "hello");
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }


    function safeMint(address to, string memory URI) public payable{
        require (balanceOf(to) == 0, "You already have a Squirrly");
        uint256 tokenId = tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, URI);
        lastQuest[tokenId] = 0;
        addressLookup[to] = tokenId;
        tokenIdCounter.increment();
    }

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

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

}