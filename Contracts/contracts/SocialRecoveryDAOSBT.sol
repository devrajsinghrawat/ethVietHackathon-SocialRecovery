// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
 
contract SocialRecoveryDAOSBT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
 
    Counters.Counter private _tokenIdCounter;
    
    mapping(address=>bool) private _owners;

    constructor() ERC721("SocialRecoveryDAO Soul Bound Token", "SBT") {}
 
    function safeMint(address to, string memory uri) public {
        require(!_owners[to],"This address already minted the token!");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _owners[to]=true;
    }
 
    // The following functions are overrides required by Solidity.
 
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
 
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _transfer(address from,address to,uint256 tokenId) internal override{
        // token cannot be transfer
        require(from == address(0),"Error: token is not transferrable");
        super._transfer(from, to, tokenId);
    }
}