//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Quest is Ownable{
    string[] public quests;

    constructor(){
    }

    function addQuest(string memory quest) public{
        quests.push(quest);
    }

    receive() external payable {
        revert();
    }
}