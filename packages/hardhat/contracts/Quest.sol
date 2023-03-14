//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Quest is AccessControl{
    string[] private quests;
    uint256 private blockTimer = 300;

    bytes32 public constant DM_ROLE = keccak256("DM_ROLE");

    //make a public view function for quests

    constructor(address[] memory DMs, address squirrlyNFTAddress){
        for (uint256 i = 0; i < DMs.length; ++i) {
            _grantRole(DEFAULT_ADMIN_ROLE, DMs[i]);
        }
        for (uint256 i = 0; i < DMs.length; ++i) {
            _grantRole(DM_ROLE, DMs[i]);
        }
    }

    function addQuest(string memory quest) public onlyRole(DM_ROLE){
        quests.push(quest);
    }

    function getQuest(uint256 idx) public view returns (string memory){
        return quests[idx];
    }

    receive() external payable {
        revert();
    }
}