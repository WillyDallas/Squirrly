/* eslint-disable prettier/prettier */
import { NFTStorage } from 'nft.storage'
import { NextApiRequest, NextApiResponse } from "next"; 

const API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || ''


async function getImage(url: string) {  
    const r = await fetch(url)
    if (!r.ok) {
      throw new Error(`error fetching image: ${r.status}`)
    }
    return r.blob()
  }

const storeNFT = async (req: NextApiRequest, res: NextApiResponse) => {
    const squirrels:string[] = [
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
        "https://bafybeigkbiz2c5kk57m2kpvtkxutzfidh2bc7vwexuspswb3vligqi27me.ipfs.w3s.link/BlackSquirrel00.png"
    ];
    const image = await getImage(squirrels[0]);
    const nft = {
        image,
        name: "SquirrlyNFT",
        description: "Just a cute lil Squirrel that don't know nuffin' 'bout politics.",
        attributes: {
            econScore: req.body.econ,
            diplScore: req.body.dipl,
            govtScore: req.body.govt,
            sctyScore: req.body.scty,
            powers: req.body.powers,
        }
    }

    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store(nft);

    console.log('NFT data stored!')
    console.log('Metadata URI: ', metadata.url)
    res.json(metadata.url)
}

export default storeNFT