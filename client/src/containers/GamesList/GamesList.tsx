import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
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
  const [votesDeleted, setVotesDeleted] = useState<boolean>(false);
  const [gamesLoaded, setGamesLoaded] = useState<boolean>(false);
  const MAX_VOTES = 3;
  const MIN_VOTES = 0;

  const getUserId = useCallback((): number | null => {
    const url = params.get("url");
    if (session && session.users) {
      const user = session.users.find((user) => {
        if (user.url === url) {
          return true;
        }

        return false;
      });
      if (user && user.id) {
        return user.id;
      }
    }

    return null;
  }, [params, session]);

  useEffect(() => {
    const getGamesFromSession = async () => {
      if (gamesLoaded && session) {
        if (session.sessionId) {
          const games = await session.getSharedGames();

          if (games) {
            setGames(games);
          }
        }
      }
    };
    getGamesFromSession();
  }, [session, setGames, gamesLoaded]);

  /* Originally this was just for new users loading in from a URL, but I decided it was worth
  using this for the host too and taking the slight hit in performance in exchange for
  streamlining all the state data due to a couple of inconsistencies. We just use setGamesLoaded
  to ensure it only fires once. */
  useEffect(() => {
    const getGamesFromUrl = async () => {
      if (!gamesLoaded) {
        const newSession = new Session();
        const url = params.get("url");

        if (url) {
          await newSession.createFromUrl(url);
          setSession(newSession);
          setGamesLoaded(true);
        }
      }
    };
    getGamesFromUrl();
  }, [setSession, gamesLoaded, setGamesLoaded, params]);

  /* Clear existing votes from this session if any exist. This is 
  to stop users refreshing the page and submitting 3 more votes */
  useEffect(() => {
    const deleteUserVotes = async () => {
      if (session) {
        const userId = getUserId();
        if (session.sessionId && userId && !votesDeleted) {
          await session.deleteUserVotesForSession(session.sessionId, userId);
          // We just want to do this once, so we set a flag here for future re-renders
          setVotesDeleted(true);
        }
      }
    };

    deleteUserVotes();
  }, [getUserId, session, votesDeleted, setVotesDeleted]);

  const doesVoteExist = (gameId: number) => {
    return votes.find((vote) => vote === gameId);
  };

  const submitVote = (
    sessionId: number,
    gameId: number,
    userId: number
  ): void => {
    const url =
      window.location.origin +
      `/api/votes?sessionId=${sessionId}&gameId=${gameId}&userId=${userId}`;
    if (votes.length < MAX_VOTES) {
      axios
        .post(url)
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
    const url =
      window.location.origin +
      `/api/votes?sessionId=${sessionId}&gameId=${gameId}&userId=${userId}`;
    if (votes.length > MIN_VOTES) {
      axios
        .delete(url)
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

  const setDoneVoting = async (
    sessionId: number,
    userId: number
  ): Promise<void> => {
    const url =
      window.location.origin + `/api/sessions/${sessionId}/users/${userId}`;
    axios.post(url).catch((error) => {
      throw new Error(error);
    });
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
              image={game.imageVerticalUrl}
              selected={selected}
              key={game.appId}
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

  if (props.session) {
    const gamesSelected = votes.length;

    const userId = getUserId();
    const sessionId = props.session.sessionId;

    if (sessionId && userId) {
      return (
        <React.Fragment>
          <div className={classes.GamesList}>{buildGames()}</div>
          <GamesSelected
            gamesSelected={gamesSelected}
            maxVotesAllowed={MAX_VOTES}
            setDoneVoting={() => setDoneVoting(sessionId, userId)}
          />
        </React.Fragment>
      );
    }

    return null;
  }

  return null;
};

export default GamesList;
