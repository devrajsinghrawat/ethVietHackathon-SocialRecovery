# Social Recovery DAO smart contract
Project for ethVietnam Hackathon

# Contracts
## Social Recovery DAO
- [x] Set Pair of hash(wallet address + password) -> Service Provider Address    
- [x] Get Pair from hash(wallet address + password) -> Service Provider Address     
- [x] Register as DAO member and mint soul bound token as proof of membership    
- [x] Verify Signature and Transfer fee to Service Provider

# Function
### v1
1. `function set_pair(bytes32 user_hash, address[] calldata sp_addr) external returns(bool)`    
Record the pair of user and SP addresses.
`user_hash`: hash of wallet address and password, bytes32 type.    
`rp_addr`: an array of address of recovery provider    
2. `function get_pair(bytes32 user_hash) external view returns(address[] memory)`     
Get the SP addresses based on user hash.    
`user_hash`: hash of wallet address and password, bytes32 type.    
3. `function registerMember() external`    
Register as a DAO member    
4. `function getDAOmember() external view returns(address [] memory)`    
Get the list of DAO member    
### v2
5. `function VerifyAndTransfer(bytes memory signature, address sp, string memory message, uint nonce ) public payable`   
Verify if the signature is signed by sp. If yes, transfer fee to sp. Called by User.
### v3
6. `function registerMember()`    
Add mintable Soul Bound Token function when user register as member.   


# Address
## Goerli
SocialRecoveryDAO (v1): `0xa7A6FAf6E6Ba8292E2Fe312374b8abf129a3104e`
SocialRecoveryDAO (v2): `0xdd5080695073C51E05D6eDde0883f1525F60177A`
SocialRecoveryDAO (v3): `0x209E2a867f821d28b81D2c52b4544E9cbD0b5713`

SocialRecoveryDAOSBT (v1): `0x24811422c758d886c77888E2733665863d39335E`
SocialRecoveryDAOSBT (v1): `0x9981FdBF9719ad7eA96193aA353c3A5078F469ed`

## Polygon Mumbai
SocialRecoveryDAO (v2): `0xF9929b15349BAc4206c7F082d4eAeeEeA9f3C30f`

SocialRecoveryDAOSBT (v1): `0x4736Bc598A71ea2B308311d2d609744844d7Dab3`