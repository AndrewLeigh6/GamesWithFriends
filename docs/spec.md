# Games With Friends

Written by Andrew Leigh.

Contact me at andrewleigh6@gmail.com.

Last updated 20/11/2020.

## Overview

Ever have that issue where you and your pals are up for playing something, but actually choosing a game is an absolute nightmare? The boys want to play The Forest, but Andy is cheap and hasn't bought it yet. Loke is dying to play Rocket League, but the thought of losing 0-8 to a bunch of 12 year olds who spent way too long practicing air dribbling fills you with despair. Alex still wants to finish Overcooked 2, knowing full well the group might not survive another session of Loke haphazardly throwing frozen discs of meat around the kitchen with the enthusiasm, but not the accuracy, of an NFL quarterback. Joey would have been happy just playing Minecraft, but you all forgot it existed, and this app only supports Steam games. Whoops.

Games With Friends lets you enter the steam URLs of you and your friends, and shows you a list of games that you all own. You and your friends will then be able to vote separately on which games you'd like to play, and the results will be displayed at the end for everyone to see. By choosing a game this way, it makes your options clear, since you know that everyone actually owns the games shown, and can also act as a reminder for older games you might have forgotten about. This should make the entire selection experience much less painful. At least, until you realise that someone forgot to buy the latest DLC for the one you picked. Sorry lads, Iceborne is still too expensive.

## Non Goals

- This won't support game libraries other than Steam (e.g. Origin, Epic Games Store, Gog Galaxy, etc)
- This won't check to see if anyone has the same DLC

## Design

Design can be found at https://www.figma.com/file/J9PAMQlLNlV9BXUpRgTJCF/GamesWithFriends

### Part 1

Once users arrive on the site, they will see the home page:

![Page 1](https://github.com/AndrewLeigh6/GamesWithFriends/blob/master/images/part%201.PNG)

- If the user clicks "Add friend", another input box will be added (just like the second input box shown)
- If the user clicks "Generate links" without entering a valid Steam URL in both input boxes, an error message will display under the offending input box that will read "Error - URL is invalid".
- If the user clicks "Generate links" and the Steam URLs entered are valid, the next page will be displayed.
- If the user clicks "Generate links" and the user and at least one friend have a valid Steam URL, then any input boxes will be left blank will be ignored and the next page will be displayed with just the user and the valid friends.

Invalid forms will look like this:

![Page 1 - error](https://github.com/AndrewLeigh6/GamesWithFriends/blob/master/images/part%201%20-%20error.PNG)

### Part 2

Once the links have been generated, the user should see this page:

![Page 2](https://github.com/AndrewLeigh6/GamesWithFriends/blob/master/images/part%202.PNG)

The user must then send each link to the associated friend. The user can click the button within the input box to easily copy the link to their clipboard. The input boxes should be read only.

- If the user clicks "View games", the next page will be displayed.
- If a friend opens the provided link, they will be taken directly to the next page.
- If the user clicks "Go back", they will be returned to the previous page, and the generated links will become invalid. Visiting them should result in an error.

### Part 3

Both the user and each friend should now see this page:

![Page 3](https://github.com/AndrewLeigh6/GamesWithFriends/blob/master/images/part%203.PNG).

**Technical Note**: Games with a maximum player cap lower than the number of friends + 1 should not be displayed. For example, if the user is voting with 4 other friends, that means that there would be 5 players total, and there's no point in displaying 2 player co-op games.

- If the user clicks "Select", that will count as a vote for the above game. The button will change to read "Selected, and change to the new styles.
- If the user clicks a button that is already considered selected, it will become unselected, and their vote will be removed. The text and styles will be reverted.
- The user may vote on up to 3 games.
- Once the user has finished voting, they can click "Done" at the bottom of the screen. This will flag them as being finished. If other users are still voting, they will be taken to the page below. Otherwise, they will proceed directly to Part 4.

![Page 4](https://github.com/AndrewLeigh6/GamesWithFriends/blob/master/images/part%204.PNG)

### Part 4

![Page 5](https://github.com/AndrewLeigh6/GamesWithFriends/blob/master/images/part%205.PNG)

- The games with the most votes will be displayed in order, with the first, second, and third most popular games featuring gold, silver, and bronze crowns, respectively. The users have decided on a game, and the process is complete.
- Games that received 0 votes will not be displayed.
- If multiple games receive the same number of votes, they will be treated as being equally popular, and both will get the same crown. They will be displayed in alphabetical order.
