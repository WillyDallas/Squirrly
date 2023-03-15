/* eslint-disable prettier/prettier */
import { NFTStorage } from 'nft.storage' 

async function getImage(url) {  
    const r = await fetch(url)
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
    }
    return r.blob()
  }

async function storeNFT(econ, dipl, govt, scty, powers, API_KEY) {
    const image = await getImage('https://bafybeibhk3puxk66eikjovtvxji5g3dyh4jwsfqu7bpfmvzue6idanu3wm.ipfs.w3s.link/OGSquirrly.png');
    const nft = {
        image,
        name: "SquirrlyNFT",
        description: "Just a cute lil Squirrel that don't know nuffin' 'bout politics.",
        attributes: {
            econScore: econ,
            diplScore: dipl,
            govtScore: govt,
            sctyScore: scty,
            powers: powers,
        }
    }

    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store(nft);

    console.log('NFT data stored!')
    console.log('Metadata URI: ', metadata.url)
}

export { storeNFT }