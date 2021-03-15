import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Vote } from "../../App";
import WaitingBubble from "../../components/WaitingBubble/WaitingBubble";
import { Session } from "../../helpers/Session";
import classes from "./Waiting.module.scss";

interface AppProps {
  session: Session | undefined;
  votes: Vote[];
  setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
}

interface VotesResponse {
  id: number;
  session_id: string;
  games_id: string;
  users_id: string;
  users: {
    id: number;
    steam_id: string;
    steam_username: string;
  };
}

const Waiting = (props: AppProps) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const history = useHistory();
  const MAX_VOTES = 3;
  const { session, setVotes, votes } = props;

  useEffect(() => {
    const getAllVotes = async (
      sessionId: number
    ): Promise<VotesResponse[] | null> => {
      const votes = await axios.get<VotesResponse[]>(
        `http://localhost:81/api/votes?sessionId=${sessionId}`
      );

      if (votes) {
        return votes.data;
      }

      return null;
    };

    const sortVotes = (votes: VotesResponse[]): Vote[] | any => {
      let userIds: number[] = [];

      // First, we want an array of unique userIds
      for (const vote of votes) {
        const userIdExists = userIds.find((id) => id === vote.users.id);

        if (!userIdExists) {
          userIds.push(vote.users.id);
        }
      }

      // Next, we want a new array that contains the votes each user has made
      const userVotes = userIds.map((userId) => {
        const result = votes.filter((vote) => {
          return vote.users.id === userId;
        });
        return result;
      });

      // Finally, we put together the Vote interface object structure we actually want
      const sortedVotes: Vote[] = userIds.map((_, index) => {
        return {
          // We grab the first one here because the username in all of them is the same, so it doesn't matter which index we use
          username: userVotes[index][0].users.steam_username,
          // Extract the gameIds
          gameIds: userVotes[index].map((vote) => {
            return Number(vote.games_id);
          }),
        };
      });

      return sortedVotes;
    };

    const init = async (): Promise<void> => {
      if (session && session.sessionId) {
        const rawVotes = await getAllVotes(session.sessionId);
        if (rawVotes) {
          const sortedVotes = sortVotes(rawVotes);
          setVotes(sortedVotes);
        }
      }
    };

    // Check initially, and then keep checking every few seconds
    const INTERVAL_TIMER = 5000;
    init();
    setIntervalId(setInterval(init, INTERVAL_TIMER));
  }, [session, setVotes]);

  useEffect(() => {
    // If everyone has 3/3 votes, we can stop polling and move to the results page
    if (votes.length > 0) {
      const usersFinishedVoting = votes.every((vote) => {
        return vote.gameIds.length === MAX_VOTES;
      });

      if (usersFinishedVoting && intervalId) {
        clearInterval(intervalId);
        history.push("/results");
      }
    }
  }, [votes, intervalId, history]);

  const renderWaitingBubbles = (): JSX.Element[] => {
    const result = votes.map((vote) => {
      return (
        <WaitingBubble
          key={vote.username}
          name={vote.username}
          selected={vote.gameIds.length}
        />
      );
    });

    return result;
  };

  return (
    <div className={classes.Waiting}>
      <p>Still waiting for the following players:</p>

      <div className={classes.WaitingBubbles}>{renderWaitingBubbles()}</div>
    </div>
  );
};

export default Waiting;
