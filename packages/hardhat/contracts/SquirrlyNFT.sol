//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SquirrlyNFT is ERC721, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    

    // Suirrel images
    // 0: OG Squirrly 
    // 1-4: Red Squirrels
    // 5-7: Grey Squirrels
    // 8-11: Brown Squirrels
    // 12: Black Squirrels
    // 13: Squirrel Hitler

    string[] Squirrels = [
        "https://bafybeibhk3puxk66eikjovtvxji5g3dyh4jwsfqu7bpfmvzue6idanu3wm.ipfs.w3s.link/OGSquirrly.png",
        "https://bafybeieflqbgwdz7fybslb47fnqpxewstkbmbwow5qzudqibstg2iejhfy.ipfs.w3s.link/RedSquirrell02.png",
        "https://bafybeidjonqogmhdhxz6kvnazmr375de3x2uwcwkkaeu5nnq2axm2meaau.ipfs.w3s.link/RedSquirrell01.png",
        "https://bafybeihokp4fuqqlr3jr2z4z7wfwzgrgwku2gixwhzxlwoktqyrfmlo5mu.ipfs.w3s.link/RedSquirrell03.png",
        "https://bafybeicfvkbavjevw7zp5gsmecbte7m5jdutuh6qywmxblef26mmzylsry.ipfs.w3s.link/RedSquirrell00.png",
        "https://bafybeig2ug5p6dig6zvn7kgmpxi5z2zhp72gtmb6676ktuka3qgkav2gpu.ipfs.w3s.link/GreySquirrell00.png",
        "https://bafybeicskl5pb2m5qgbg77x4dilstkakiayi4slhqyzzhaf6fwzl5ssuba.ipfs.w3s.link/GreySquirrell01.png",
        "https://bafybeigsnwd4bhjlchlhjwmixtnaxyz247eqllh46gleytij5renca6rma.ipfs.w3s.link/GreySquirrell02.png",
        "https://bafybeibgdwyyqr5ypu356g2vbi2uyvnq7i5ck7qij5uwahwhidrtd2wxlq.ipfs.w3s.link/BrownSquirrell00.png",
        "https://bafybeiey2n3bx2eigpkvn6tckdgjrxes3d6psm7ewqkjbstknest642u4i.ipfs.w3s.link/BrownSquirrell02.png",
        "https://bafybeiea7jnvwhjc5kpux4hy6qi2d7pxdwhbawmdenoulxovway3zl72l4.ipfs.w3s.link/BrownSquirrell01.png",
        "https://bafybeifsliudtkcvvvfhypanfzxlyobrtipqvrzreoqd72dnmdv6gnrvyy.ipfs.w3s.link/BrownSquirrell03.png",
        "https://bafybeigkbiz2c5kk57m2kpvtkxutzfidh2bc7vwexuspswb3vligqi27me.ipfs.w3s.link/BlackSquirrel00.png",
        "https://bafybeih3l3bguz6e7cowfedyyggwibm253bjv35oxhmckjkgi6vrwmhbkm.ipfs.w3s.link/SquirrelHitler.png"
    ];

    Counters.Counter public tokenIdCounter;

    struct Squirrl{
        string image;
        uint256 econScore;
        uint256 diplScore;
        uint256 govtScore;
        uint256 sctyScore;
        string power;
    }

    Squirrl[] public squirrls;

    constructor(address[] memory whiteList) ERC721("Squirrly", "SQRL") {
        safeMint(msg.sender, 0, 0, 0, 0, 0, "Dev");
        for (uint i=0; i < whiteList.length; i++){
            safeMint(whiteList[i], 0, 0, 0, 0, 0, "Dev");
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(
        address to, 
        uint256 charId, 
        uint256 econ, 
        uint256 dipl, 
        uint256 govt, 
        uint256 scty, 
        string memory power) 
        public payable{
        
        uint8 aux = uint8 (charId);
        require( (aux >= 0) && (aux <= 13), "invalid charId");
        string memory yourCharacterImage = Squirrels[charId];

        squirrls.push(Squirrl(yourCharacterImage, econ, dipl, govt, scty, power));

        uint256 tokenId = tokenIdCounter.current();
        string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "SquirrlyNFT",',
                        '"description": "So innocent and cute...",',
                        '"image": "', squirrls[tokenId].image, '",'
                        '"attributes": [',
                        '{',
                            '"trait_type": "econScore",',
                            '"value": ', squirrls[tokenId].econScore.toString(),
                        '}',
                        '{',
                            '"trait_type": "govtScore",',
                            '"value": ', squirrls[tokenId].govtScore.toString(),
                        '}',
                            '"trait_type": "diplScore",',
                            '"value": ', squirrls[tokenId].diplScore.toString(),
                        '}',
                            '"trait_type": "sctyScore",',
                            '"value": ', squirrls[tokenId].sctyScore.toString(),
                        '}',
                            '"trait_type": "power",',
                            '"value": ', squirrls[tokenId].power,
                            '}]'
                        '}'
                    )
                )
            )
        );
        string memory finalTokenURI = string(
            abi.encodePacked("data:application/json;base64,", uri)
        );
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, finalTokenURI);

    }

    // This function will update the NFT metadata
    // function run(uint256 tokenId, uint256 distance) public {
    //     runners[tokenId].distance += distance;

    //     string memory uri = Base64.encode(
    //         bytes(
    //             string(
    //                 abi.encodePacked(
    //                     '{"name": "RunnerNFT",',
    //                     '"description": "This is your character",',
    //                     '"image": "', runners[tokenId].image, '",'
    //                     '"attributes": [',
    //                     '{',
    //                         '"trait_type": "distance",',
    //                         '"value": ', runners[tokenId].distance.toString(),
    //                         '}]'
    //                     '}'
    //                 )
    //             )
    //         )
    //     );
    //     // Create token URI
    //     string memory finalTokenURI = string(
    //         abi.encodePacked("data:application/json;base64,", uri)
    //     );
    //     _setTokenURI(tokenId, finalTokenURI);
    // }

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