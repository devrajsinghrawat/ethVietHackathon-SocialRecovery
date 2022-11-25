# Getting Started with Social Recovery DAO Portal for DEMO
Install Metamask and use the below seeds
core camera cabbage laugh badge all nose like adjust warrior chaos trap

We are using these seeds for Demo caz we had hardcoded the service provider until the soulbased token is implemented.

## Create 7 accounts from Metamask:

Initial 5 accounts are allocated for service providers
1. SP Account '0xF9901CC6bbC8518088B2C8350fCd0635A23b250E',
2. SPAddress: '0x23Ed077d5c630cF9b55324Ca3bC706a70ffCb696',
3. SPAddress: '0xB2FB886Eb402848B772469a34a7180747C7F7934',
4. SPAddress: '0x4Fb0a43C637566f2f18B2eE7034f430A7F95dBcF',
5. SPAddress: '0x19b228f57165be621f49D96E26C459Aa115Eb83D',


6. User Account: 0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6

7. New User New Device address: 0xBcE8A747EefB1F115e327698797f99156e905D4D

## Demo 
# Step 1 - Service enrollment
User Account (0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6):
 - Login by User Account
 - Go to Enroll Me
 - Select one of the sp address
 - Click on action button
 - Popup open and fill your wallet address (safe.eth)
 - Go to Dashboard page and Scroll down to Open Request Table and we can view the Enroll service request created for user

# Step 2 - Service provider acceptance
SP Account(0xF9901CC6bbC8518088B2C8350fCd0635A23b250E): 
- Login by Service provider Account, which was selected at Enroll Me screen of Step 1
- Go to Dashboard page and scroll down to Service Request table
- Click Approve button to approve the service request created by the User in Step 1

# Step 3 - User confirmation and fee payment for on-chain tx
User Account (0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6):
 - Go to Dashboard page and Scroll down to Open Request Table and we can view the service request created for user
 - Click on **Confirm** action button
 - This will create a service provider and user wallet mapping in smart contract
 - In **Garud Me** tab user can select his wallet and check all service providers who are gurding his wallet for recoevery
 
 Now suppose user lost the access of his device and seeds. He will get a new device and start the recovery process using his new device, in this Demo the new device address is 0xBcE8A747EefB1F115e327698797f99156e905D4D

 User had collected all other signatures on recovery tx : 0xthis-is-recovery-tx and now need an additional signature form social recovery dao. 

 # Step 4 - Signature request on recovery tx 
User Account (0xBcE8A747EefB1F115e327698797f99156e905D4D):
 - Login by new User Account
 - Go to Guard Me tab
 - As this is a new user address, User will click on **Initiate Recovery**
 - User needs to provide his older user address (i.e. 0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6) (in future we have plans to add a password along with the user address input so that no other than user can initiate the recovery) and Then system ll fetch all wallets assocaited with this user and then user will select the wallet for which we need a signature serivce
 - System ll fetch all service providers providing signature serivce to this wallet from smart contract
 - User will click on request signature action button for any specific service provider
 - This will open a input pop up where user needs to provide the recovery tx : 0xthis-is-recovery-tx
 - Go to Dashboard page and Scroll down to Open Request Table and we can view the Sign service request created for user

# Step 5 - Service provider signing on the recovery message
SP Account(0xF9901CC6bbC8518088B2C8350fCd0635A23b250E): 
- Login by Service provider Account, which was selected at Guard Me screen of Step 4
- Go to Dashboard page and scroll down to Service Request table
- Click Sign Message button to generate signnature on the recovery tx
- This will open a pop up, which will show the recovery transaction and when service provider will click on done then signature of service provider will be captured on recovery tx and stored in backend server.

 # Step 6 - Signature fetching and fee payment on recovery tx 
User Account (0xBcE8A747EefB1F115e327698797f99156e905D4D):
 - Login by new User Account
 - Go to Dashboard page and Scroll down to Open Request Table and we can view the Sign service request in sign status
 - User will click on Fetch Signature action button, which will create a on-chain tx for signature verification and if verified successfully then fee payment.
 - After successful payment user will able to fetch the recovery signature.

 ## Open Points
 - Onchain integrations are pending 
 - wallet address hashing and password logic is pending 
 - Dummy Signature is hardcoded in backend currently 
