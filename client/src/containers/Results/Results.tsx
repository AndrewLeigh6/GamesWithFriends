import React from "react";
import WinningGame from "../../components/WinningGame/WinningGame";
import classes from "./Results.module.scss";

interface Winner {
  title: string;
  image: string;
  votes: number;
}

const Results = () => {
  const winningGames = winners.map((winner: Winner) => {
    return (
      <WinningGame
        title={winner.title}
        image={winner.image}
        votes={winner.votes}
      />
    );
  });

  return <div className={classes.Results}>{winningGames}</div>;
};

const winners: Winner[] = [
  {
    title: "Fall Guys: Ultimate Knockout",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/capsule_467x181.jpg?t=1592241545",
    votes: 4,
  },
  {
    title: "Deep Rock Galactic",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/548430/capsule_467x181.jpg?t=1572877557",
    votes: 3,
  },
  {
    title: "Terraria",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/capsule_467x181.jpg?t=1435630291",
    votes: 3,
  },
];

export default Results;
