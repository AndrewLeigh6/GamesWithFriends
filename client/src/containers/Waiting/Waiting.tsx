import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Vote } from "../../App";
import WaitingBubble from "../../components/WaitingBubble/WaitingBubble";
import { Session } from "../../helpers/Session";
import classes from "./Waiting.module.scss";

interface WaitingProps {
  session: Session | undefined;
  votes: Vote[];
  setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
}

interface VotesResponse {
  id: number;
  sessionId: string;
  gamesId: string;
  usersId: string;
  users: {
    id: number;
    steamId: string;
    steamUsername: string;
  };
}

interface UsersVotingResponse {
  steamId: string;
  steamUsername: string;
  doneVoting: boolean;
}

const Waiting = (props: WaitingProps) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [usersDoneVoting, setUsersDoneVoting] =
    useState<UsersVotingResponse[]>();
  const history = useHistory();
  const { session, setVotes, votes } = props;

  useEffect(() => {
    const getUsersDoneVoting = async (
      sessionId: number
    ): Promise<UsersVotingResponse[]> => {
      const url = window.location.origin + `/api/sessions/${sessionId}/users`;
      const result = await axios.get<UsersVotingResponse[]>(url);
      const usersDoneVoting = result.data.filter(
        (user) => user.doneVoting === true
      );
      return usersDoneVoting;
    };

    const getAllVotes = async (
      sessionId: number
    ): Promise<VotesResponse[] | null> => {
      const url = window.location.origin + `/api/votes?sessionId=${sessionId}`;
      const votes = await axios.get<VotesResponse[]>(url);

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
          username: userVotes[index][0].users.steamUsername,
          steamId: userVotes[index][0].users.steamId,
          // Extract the gameIds
          gameIds: userVotes[index].map((vote) => {
            return Number(vote.gamesId);
          }),
        };
      });

      return sortedVotes;
    };

    const init = async (): Promise<void> => {
      if (session && session.sessionId) {
        const rawVotes = await getAllVotes(session.sessionId);
        setUsersDoneVoting(await getUsersDoneVoting(session.sessionId));

        if (rawVotes) {
          const sortedVotes = sortVotes(rawVotes);
          setVotes(sortedVotes);
        }
      }
    };

    // Check initially, and then keep checking every few seconds
    const INTERVAL_TIMER = 5000;
    init();
    const intervalId = setInterval(init, INTERVAL_TIMER);
    setIntervalId(intervalId);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [session, setVotes]);

  useEffect(() => {
    // If everyone has 3/3 votes, we can stop polling and move to the results page
    if (session) {
      if (session.users && usersDoneVoting) {
        if (session.users.length === usersDoneVoting.length && intervalId) {
          console.log(session.users.length);
          console.log(usersDoneVoting.length);

          clearInterval(intervalId);
          history.push("/results");
        }
      }
    }
  }, [votes, intervalId, history, session, usersDoneVoting]);

  const getUsersStillVoting = (): Vote[] => {
    if (usersDoneVoting) {
      const usersStillVoting = votes.filter((vote) =>
        usersDoneVoting.find((user) => user.steamUsername !== vote.username)
      );
      return usersStillVoting;
    } else {
      return votes;
    }
  };

  const getUsersWithoutVotes = () => {
    // If we have a user in the session who hasn't voted yet, just show them as 0/3 rather than displaying nothing.
  };

  const renderWaitingBubbles = (usersStillVoting: Vote[]): JSX.Element[] => {
    const result = usersStillVoting.map((user) => {
      return (
        <WaitingBubble
          key={user.username}
          name={user.username}
          selected={user.gameIds.length}
        />
      );
    });

    return result;
  };

  getUsersWithoutVotes();

  return (
    <div className={classes.Waiting}>
      <p>Still waiting for the following players:</p>

      <div className={classes.WaitingBubbles}>
        {renderWaitingBubbles(getUsersStillVoting())}
      </div>
    </div>
  );
};

export default Waiting;
