// declare global {
//     interface Window {
//         Cypher: any;
// }

declare const window: Window &
  typeof globalThis & {
    Cypher: any;
  };

export const cypher = () => {
  if (typeof window.Cypher !== undefined) {
    window.Cypher({
      address: "0xdEc1bc71bf91431D60eF2742f412DCd1c5A204B8",
      targetChainIdHex: "0x13881", // Polygon Mumbai
      requiredTokenBalance: 65,
      isTestnet: true,
      callBack: () => {
        console.log("callBack called");
      },
    });
  }
};
