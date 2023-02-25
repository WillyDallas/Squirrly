// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("Squirrly", "SQRL") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}



/*
******************************************
NOTES
******************************************

******************************************
mapping for whitelist
******************************************

mapping (address => bool) whiteList;


******************************************
constructor adds msg.sender to whitelist
******************************************

constructor(){
    owner = msg.sender;
    whiteList[owner] = true;
}

******************************************
using a modifier function
******************************************

modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
}

function addToWhiteList(address _address) public onlyOwner {
    whiteList[_address] = true;
}

******************************************


*/