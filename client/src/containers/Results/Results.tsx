import React from "react";
import { Vote } from "../../App";
import WinningGame from "../../components/WinningGame/WinningGame";
import { SharedGame } from "../../helpers/Session";
import classes from "./Results.module.scss";

interface ResultsProps {
  votes: Vote[];
  games: SharedGame[] | undefined;
}

interface ResultTotals {
  [key: number]: number;
}

interface Winner {
  title: string;
  image: string;
  votes: number;
}

/* This all looks a bit mental, but we're just counting votes and transforming this:
  [{username: "someone", gameIds: [266, 225, 268]}
  {username: "someone else", gameIds: [266, 259, 214]}]
  into this:
  {266: 2, 225: 1, 268: 1, 259: 1, 214: 1} */
const getResultTotals = (votes: Vote[]): ResultTotals => {
  const allVotes = votes.reduce<number[]>((total: number[], current: Vote) => {
    return total.concat(current.gameIds);
  }, []);

  let voteTotals: ResultTotals = {};

  allVotes.forEach((vote) => {
    if (voteTotals[vote]) {
      voteTotals[vote] = voteTotals[vote] + 1;
    } else {
      voteTotals[vote] = 1;
    }
  });

  return voteTotals;
};

const getWinningGames = (
  games: SharedGame[],
  votes: Vote[]
): Winner[] | any => {
  if (games) {
    const voteTotals = getResultTotals(votes);
    let winningGames = [];

    /* Just need to dig out the info we need from our existing games state */
    for (const id in voteTotals) {
      const gameId = Number(id);
      const gameDetails = games.find((game) => {
        return game.id === gameId;
      });

      if (gameDetails) {
        const winningGame: Winner = {
          title: gameDetails.name,
          image: gameDetails.image_horizontal_url,
          votes: voteTotals[id],
        };

        winningGames.push(winningGame);
      }
    }

    const sortedGames = winningGames.sort((a, b) => {
      return b.votes - a.votes;
    });

    const MAX_WINNERS = 3;
    const topWinningGames = sortedGames.slice(0, MAX_WINNERS);

    return topWinningGames;
  }
};

const Results = (props: ResultsProps) => {
  const renderWinningGames = () => {
    if (props.games) {
      const winners = getWinningGames(props.games, props.votes);

      const winningGames = winners.map((winner: Winner) => {
        return (
          <WinningGame
            title={winner.title}
            image={winner.image}
            votes={winner.votes}
          />
        );
      });

      return winningGames;
    }
  };

  return <div className={classes.Results}>{renderWinningGames()}</div>;
};

export default Results;
