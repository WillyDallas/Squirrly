// event listener for calling cypher window method
// call in autoconnect function

declare const window: Window &
  typeof globalThis & {
    Cypher: any;
  };

export const cypher = (address: string) => {
  if (typeof window.Cypher !== undefined) {
    window.Cypher({
      address: address,
      targetChainIdHex: "0x13881", // Polygon Mumbai
      requiredTokenBalance: 65,
      isTestnet: true,
      callBack: () => {
        console.log("callBack called");
      },
    });
  }
};
