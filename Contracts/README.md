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
SocialRecoveryDAO: `0x339FD585252ee80F9566592408d85561DCb51A2b`

SocialRecoveryDAOSBT: `0x7BE934a5C25Bd8De9C8D23df164f33816C133d9e`

## Polygon Mumbai
SocialRecoveryDAO: `0x00Db3CeB2d938Bf3dd765f5752646661902B85FA`

SocialRecoveryDAOSBT: `0xF427C65E17eb1ABa6dA6b26092c31fddA04dD0Bb`

## Scroll L2 Testnet    
SocialRecoveryDAOSBT: `0x117a61ba4dd4F61C90d212337D0C804b63607fd5`

SocialRecoveryDAO: `0xf63C5f5d148646C3eEd28d891E53db21dadF170E`