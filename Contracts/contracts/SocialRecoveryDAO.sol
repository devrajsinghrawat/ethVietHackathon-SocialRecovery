//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VerifySignature.sol";
import "./SocialRecoveryDAOSBT.sol";
contract SocialRecoveryDAO is VerifySignature {
    uint256 DAOID;
    uint256 baseFee = 1e15;  // 0.001 ether
    string DAO_TOKEN_URI = "https://mirror-media.imgix.net/nft/FkcIEqr8h9wwLKNfAQhU4.png?h=null&w=null&auto=compress";
    mapping(bytes32=>address[]) private user_to_SP;
    mapping(uint256=>address) public DAOID_to_address;
    event New_Pair(bytes32 indexed user, address[] SP_address);
    event fee_paid(address indexed user, address indexed sp);
    event New_member(uint256 tokenID, address member);

    SocialRecoveryDAOSBT SRDAOSBT;

    constructor(address SBT_addr){
      SRDAOSBT = SocialRecoveryDAOSBT(SBT_addr);
    }

    /* Set the pair of hash(wallet_address+password) to Service Provider address(es)
    *  @params user_hash: hash of Wallet address + password
    *  @params rp_addr: An array of Service Provider Address
    */
    function set_pair(bytes32 user_hash, address[] calldata sp_addr) external
    {
        require(user_hash!=0,"user cannot be 0!");

        user_to_SP[user_hash] = sp_addr;
        emit New_Pair(user_hash,sp_addr);

    }
    /*  return the addresses of SP based of user hash
    *   @params user_hash: hash of Wallet address + password
    */
    function get_pair(bytes32 user_hash) external view returns(address[] memory){
        address[] memory sp_addr = user_to_SP[user_hash];
        return sp_addr;
    }

    /* Register as a DAO member
    *  member address = msg.sender
    */
    function registerMember() public {
      SRDAOSBT.safeMint(msg.sender,DAO_TOKEN_URI);
      DAOID_to_address[DAOID] = msg.sender;
      emit New_member(DAOID, msg.sender);
      DAOID = DAOID+1;
    }

    /* Get total list of DAO members
    * 
    */
    function getDAOmemberList() external view returns(address [] memory){
        address[] memory DAOmember; // define an empty array

        for (uint256 i=0;i<DAOID;i++){
        DAOmember[i]= DAOID_to_address[i];
        }

        return DAOmember;

    }

    /* Verify if signature is signed from SP
    *  If yes, transfer fee to SP (User has to send ethers when calling this function)
    *  @params signature: signature signed
    *  @params sp: the address of service provider
    *  @params message: message signed by signer
    *  @params nonce: number to prevent re-entrancy
    */
    function VerifyAndTransfer(bytes memory signature, address sp, string memory message, uint nonce ) public payable {
    //       function verify(
    //     address _signer,
    //     address _to,
    //     string memory _message,
    //     uint _nonce,
    //     bytes memory signature
    // )
      bool result = verify(msg.sender,sp, message, nonce, signature);
      require(result==true, "signature is not correct!");
      require(payable(address(sp)).send(baseFee), "transfer fee error");
      emit fee_paid(msg.sender,sp);
    }

    /* Simple Transfer function for testing
    *  @paarams receiver: the receiver of ethers
    */
    function SimplTransfer(address receiver) public payable{
      payable(address(receiver)).send(msg.value);
    }
}