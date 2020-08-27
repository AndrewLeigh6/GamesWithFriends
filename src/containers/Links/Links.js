import React, { useState } from "react";
import LinksGenerator from "../../components/LinksGenerator/LinksGenerator";
import GeneratedLinks from "../../components/GeneratedLinks/GeneratedLinks";

function Links() {
  const [linksGenerated, setLinksGenerated] = useState(false);
  const [users, setUsers] = useState([
    {
      name: "player-1",
      label: "Player 1 (that's you!)",
      value: "",
      placeholder: "https://steamcommunity.com/id/your-steam-profile/",
    },
    {
      name: "player-2",
      label: "Player 2",
      value: "",
      placeholder: "https://steamcommunity.com/id/your-friends-profile/",
    },
    {
      name: "player-3",
      label: "Player 3",
      value: "",
      placeholder: "https://steamcommunity.com/id/your-friends-profile/",
    },
  ]);

  function handleChange(event) {
    event.persist();
    const tempUsers = [...users];
    const name = event.target.name;
    const value = event.target.value;

    const user = users.find((user) => user.name === name);
    user.value = value;
    setUsers(tempUsers);
  }

  function addFriend() {
    let tempUsers = [...users];
    const nextUserNo = tempUsers.length + 1;

    const newFriend = {
      name: `player-${nextUserNo}`,
      label: `Player ${nextUserNo}`,
      value: "",
      placeholder: "https://steamcommunity.com/id/your-friends-profile/",
    };

    tempUsers.push(newFriend);

    setUsers(tempUsers);
  }

  function removeFriend() {
    let tempUsers = [...users];
    if (tempUsers.length === 2) {
      return null;
    }

    tempUsers = tempUsers.filter((user, index) => {
      return index !== tempUsers.length - 1;
    });

    setUsers(tempUsers);
  }

  return (
    <div className="Links">
      {linksGenerated ? (
        <GeneratedLinks users={users} />
      ) : (
        <LinksGenerator
          users={users}
          setUsers={setUsers}
          handleAddFriend={addFriend}
          handleRemoveFriend={removeFriend}
          handleChange={handleChange}
          setLinksGenerated={setLinksGenerated}
        />
      )}
    </div>
  );
}

export default Links;
