# Squirrly 🐿️

⚠️ This project is currently under active development. Things might break. Feel free to check the open issues & create new ones.

When you join a DAO it’s generally aligned in purpose, mission or goal, but you often find that although communities are aligned in purpose,

they often diverge on value questions, specifically values of governance like token-weighted voting, cooperation and hierarchy.

What if we formed communities on the basis of shared governance values first?

Thus, Squirrly.

Squirrly is a silly, game about squirrel politics and morals. Users mint a squirrel NFT and are presented with daily quests which are branching choose your own adventure stories. The choices sometimes result in them earning more acorns, the native squirrel currency, but always impact their position in our 4 dimensional political value matrix. After two weeks, the game moves to phase two where players are clustered into value-aligned communities

and given group scenarios where they must vote how to respond. Differently aligned communities will have different choices and abilities based on their position in the matrix. A market-aligned community would have acorn-weighted voting for instance and an isolationist community would be able to attack.

Offline communities will arise as the groups coordinate their responses.

One interesting, final thing to think about is that we can create value-aligned DAOs by minimizing average distance of players in the clusters, but we can create DAOs that hate each other by maximizing the average distance within the clusters. And the game is playable whichever way we choose to implement it.

Further integrations with social profiles like lens and farcaster can create persistent communities that live in the squirrly space and can use our value-alignment model to on-board creators to their meta-labels.

## Quickstart

1. Clone this repo & install dependencies

```
git clone https://github.com/WillyDallas/Squirrly
cd Squirrly
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

