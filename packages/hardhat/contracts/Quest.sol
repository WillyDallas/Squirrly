//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Quest is Ownable{
    string[] public quests;
    uint256 private blockTimer = 300;

    //make a public view function for quests

    constructor(){
    }

    function addQuest(string memory quest) public{
        quests.push(quest);
    }

    // function getQuest(uint256 idx) public returns (string memory){
    //     return quests[idx];
    // }

    receive() external payable {
        revert();
    }
}