import React, { useEffect } from "react";
import { Icon } from "../../components/FoundGame/Feature/Feature";
import FoundGame from "../../components/FoundGame/FoundGame";
import GamesSelected from "../../components/GamesSelected/GamesSelected";
import { Session, SharedGame } from "../../helpers/Session";
import classes from "./GamesList.module.scss";

interface AppProps {
  session: Session | undefined;
  games: SharedGame[] | undefined;
  setGames: React.Dispatch<React.SetStateAction<SharedGame[] | undefined>>;
}

const GamesList = (props: AppProps) => {
  const { session, setGames } = props;

  useEffect(() => {
    const getGames = async () => {
      if (session instanceof Session) {
        const games = await session.getSharedGames();
        if (games) {
          setGames(games);
        }
      }
    };
    getGames();
  }, [session, setGames]);

  const buildGames = (): JSX.Element[] | null => {
    if (props.games && props.games.length > 0) {
      const gamesList = props.games.map((game) => {
        return (
          <FoundGame
            title={game.name}
            image={game.image_vertical_url}
            icon={Icon.Controller}
            buttonText="Select"
            key={game.app_id}
            feature="feature"
          />
        );
      });

      return gamesList;
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
