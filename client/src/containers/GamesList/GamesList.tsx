import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import FoundGame from "../../components/FoundGame/FoundGame";
import GamesSelected from "../../components/GamesSelected/GamesSelected";
import { Session, SharedGame } from "../../helpers/Session";
import classes from "./GamesList.module.scss";

interface GamesListProps {
  session: Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  games: SharedGame[] | undefined;
  setGames: React.Dispatch<React.SetStateAction<SharedGame[] | undefined>>;
}

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

const GamesList = (props: GamesListProps) => {
  const { session, setGames, setSession } = props;
  const params = useQuery();
  const [votes, setVotes] = useState<number[]>([]);
  const MAX_VOTES = 3;
  const MIN_VOTES = 0;

  /* This looks weird due to the repeated session check, but they
   had to be split in two to avoid the infinite loop of death. */
  useEffect(() => {
    const getGamesFromSession = async () => {
      if (session !== undefined) {
        const games = await session.getSharedGames();

        if (games) {
          setGames(games);
        }
      }
    };
    getGamesFromSession();
  }, [session, setGames]);

  useEffect(() => {
    const getGamesFromUrl = async () => {
      if (session === undefined) {
        const newSession = new Session();
        const url = params.get("q");

        if (url) {
          await newSession.createFromUrl(url);
          setSession(newSession);
        }
      }
    };
    getGamesFromUrl();
  }, [session, setSession, params]);

  const getUserId = (): number | null => {
    const url = params.get("q");
    if (session && session.users) {
      const user = session.users.find((user) => {
        if (user.randomUrl === url || user.url === url) {
          return true;
        }

        return false;
      });
      if (user && user.id) {
        return user.id;
      }
    }

    return null;
  };

  const doesVoteExist = (gameId: number) => {
    return votes.find((vote) => vote === gameId);
  };

  const submitVote = (
    sessionId: number,
    gameId: number,
    userId: number
  ): void => {
    if (votes.length < MAX_VOTES) {
      axios
        .post(
          `http://localhost:81/api/votes?sessionId=${sessionId}&gameId=${gameId}&userId=${userId}`
        )
        .then(() => {
          const voteExists = doesVoteExist(gameId);
          if (!voteExists) {
            setVotes((oldVotes) => [...oldVotes, gameId]);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  };

  const cancelVote = async (
    sessionId: number,
    gameId: number,
    userId: number
  ): Promise<void> => {
    if (votes.length > MIN_VOTES) {
      axios
        .delete(
          `http://localhost:81/api/votes?sessionId=${sessionId}&gameId=${gameId}&userId=${userId}`
        )
        .then((res) => {
          console.log(res);

          const voteExists = doesVoteExist(gameId);
          if (voteExists) {
            setVotes((oldVotes) => oldVotes.filter((vote) => vote !== gameId));
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  };

  const buildGames = (): JSX.Element[] | null => {
    if (props.games && props.games.length > 0 && props.session) {
      const userId = getUserId();
      const sessionId = props.session.sessionId;

      if (userId && sessionId) {
        const gamesList = props.games.map((game) => {
          let selected = false;
          const voteExists = doesVoteExist(game.id);
          if (voteExists) {
            selected = true;
          }
          return (
            <FoundGame
              title={game.name}
              image={game.image_vertical_url}
              selected={selected}
              key={game.app_id}
              features={game.categories}
              selectedHandler={() => submitVote(sessionId, game.id, userId)}
              deselectedHandler={() => cancelVote(sessionId, game.id, userId)}
            />
          );
        });

        return gamesList;
      }
    }

    return null;
  };

  const gamesSelected = votes.length;

  return (
    <React.Fragment>
      <div className={classes.GamesList}>{buildGames()}</div>
      <GamesSelected
        gamesSelected={gamesSelected}
        maxVotesAllowed={MAX_VOTES}
      />
    </React.Fragment>
  );
};

export default GamesList;
