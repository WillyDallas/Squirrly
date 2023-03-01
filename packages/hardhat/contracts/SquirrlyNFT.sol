//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SquirrlyNFT is ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    string[] Squirrels = [
        "https://bafybeihokp4fuqqlr3jr2z4z7wfwzgrgwku2gixwhzxlwoktqyrfmlo5mu.ipfs.w3s.link/RedSquirrell03.png",
        "https://bafybeieflqbgwdz7fybslb47fnqpxewstkbmbwow5qzudqibstg2iejhfy.ipfs.w3s.link/RedSquirrell02.png",
        "https://bafybeidjonqogmhdhxz6kvnazmr375de3x2uwcwkkaeu5nnq2axm2meaau.ipfs.w3s.link/RedSquirrell01.png",
        "https://bafybeigsnwd4bhjlchlhjwmixtnaxyz247eqllh46gleytij5renca6rma.ipfs.w3s.link/GreySquirrell02.png",
        "https://bafybeih3l3bguz6e7cowfedyyggwibm253bjv35oxhmckjkgi6vrwmhbkm.ipfs.w3s.link/SquirrelHitler.png",
        "https://bafybeibgdwyyqr5ypu356g2vbi2uyvnq7i5ck7qij5uwahwhidrtd2wxlq.ipfs.w3s.link/BrownSquirrell00.png",
        "https://bafybeiey2n3bx2eigpkvn6tckdgjrxes3d6psm7ewqkjbstknest642u4i.ipfs.w3s.link/BrownSquirrell02.png",
        "https://bafybeig2ug5p6dig6zvn7kgmpxi5z2zhp72gtmb6676ktuka3qgkav2gpu.ipfs.w3s.link/GreySquirrell00.png",
        "https://bafybeicskl5pb2m5qgbg77x4dilstkakiayi4slhqyzzhaf6fwzl5ssuba.ipfs.w3s.link/GreySquirrell01.png",
        "https://bafybeiea7jnvwhjc5kpux4hy6qi2d7pxdwhbawmdenoulxovway3zl72l4.ipfs.w3s.link/BrownSquirrell01.png",
        "https://bafybeihokp4fuqqlr3jr2z4z7wfwzgrgwku2gixwhzxlwoktqyrfmlo5mu.ipfs.w3s.link/RedSquirrell03.png",
        "https://bafybeifsliudtkcvvvfhypanfzxlyobrtipqvrzreoqd72dnmdv6gnrvyy.ipfs.w3s.link/BrownSquirrell03.png",
        "https://bafybeibhk3puxk66eikjovtvxji5g3dyh4jwsfqu7bpfmvzue6idanu3wm.ipfs.w3s.link/OGSquirrly.png",
        "https://bafybeicfvkbavjevw7zp5gsmecbte7m5jdutuh6qywmxblef26mmzylsry.ipfs.w3s.link/RedSquirrell00.png",
        "https://bafybeigkbiz2c5kk57m2kpvtkxutzfidh2bc7vwexuspswb3vligqi27me.ipfs.w3s.link/BlackSquirrel00.png"
    ]

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Squirrly", "SQRL") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, uint256 tokenId, string memory uri) public, payable{
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

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

    receive() external payable {
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

}