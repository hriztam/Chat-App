// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    constructor() {
        
    }
    
    // Structs
    struct user {
        string name;
        friend[] friendList;
        
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timeStamp;
    }

    mapping (address => user) userList;
    mapping (bytes32 => message[]) allMessage;

    // Checking the existance of user
    function checkUserExists(address pubkey)  public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    // Create New User
    function createAccount(string calldata name)  external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;
    }

}