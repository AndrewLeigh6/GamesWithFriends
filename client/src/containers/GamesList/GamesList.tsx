import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Icon } from "../../components/FoundGame/Feature/Feature";
import FoundGame from "../../components/FoundGame/FoundGame";
import GamesSelected from "../../components/GamesSelected/GamesSelected";
import { Session, SharedGame } from "../../helpers/Session";
import classes from "./GamesList.module.scss";

interface AppProps {
  session: Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  games: SharedGame[] | undefined;
  setGames: React.Dispatch<React.SetStateAction<SharedGame[] | undefined>>;
  submitVote: (sessionId: number, gameId: number, userId: number) => void;
}

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

const GamesList = (props: AppProps) => {
  const { session, setGames, setSession } = props;
  const params = useQuery();

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

  const buildGames = (): JSX.Element[] | null => {
    if (props.games && props.games.length > 0 && props.session) {
      const userId = getUserId();
      const sessionId = props.session.sessionId;

      if (userId && sessionId) {
        const gamesList = props.games.map((game) => {
          return (
            <FoundGame
              title={game.name}
              image={game.image_vertical_url}
              buttonText="Select"
              key={game.app_id}
              features={game.categories}
              selectedHandler={() =>
                props.submitVote(sessionId, game.id, userId)
              }
            />
          );
        });

        return gamesList;
      }
    }

    return null;
  };

  return (
    <React.Fragment>
      <div className={classes.GamesList}>{buildGames()}</div>
      <GamesSelected gamesSelected={0} />
    </React.Fragment>
  );
};

export default GamesList;
