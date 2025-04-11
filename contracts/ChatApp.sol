// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatApp {
    //user struct
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
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruct{
        string name;
        address accountAddress;
    }
    AllUserStruct[] getAllUser;
    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;
    
    //check user exist;
    function checkUserExist(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }
    function createAccount(string calldata name) external {
        require(checkUserExist(msg.sender) == false, "user already exist");
        require(bytes(name).length > 0, "Username can't be empty");
        userList[msg.sender].name = name;
        getAllUser.push(AllUserStruct(name,msg.sender));
    }
    //get username
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExist(pubkey), "user not exist");
        return userList[pubkey].name;
    }
    //add friend
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExist(msg.sender), "Create account first");
        require(checkUserExist(friend_key), "user is not registered");
        require(
            msg.sender != friend_key,
            "Users can't add themeselve as friends"
        );
        require(checkAlreadyFriend(msg.sender, friend_key), "Already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }
    function _addFriend(
        address user,
        address friend_key,
        string memory name
    ) internal {
        userList[user].friendList.push(friend(friend_key, name));
    }
    function checkAlreadyFriend(
        address user,
        address friend_key
    ) internal view returns (bool) {
        if (
            userList[user].friendList.length >
            userList[friend_key].friendList.length
        ) {
            address temp = user;
            user = friend_key;
            friend_key = temp;
        }
        for (uint256 i = 0; i < userList[user].friendList.length; i++) {
            if (userList[user].friendList[i].pubkey == friend_key) {
                return true;
            }
        }
        return false;
    }

    // function _addFriend(
    //     address me,
    //     address friend_key,
    //     string memory name
    // ) internal {
    //     friend memory newFriend = friend(friend_key, name);
    //     userList[me].friendList.push(newFriend);
    // }
    //get my friend
    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    //send message

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "User is not registered");
        require(
            checkAlreadyFriend(msg.sender, friend_key),
            "You are not friends"
        );
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }

    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }
    function getAllAppUser() public view returns(AllUserStruct[] memory){
        return getAllUser;
    }
}
