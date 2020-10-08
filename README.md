# Games With Friends

Written by Andrew Leigh. Contact me at andrewleigh6@gmail.com.
Last updated 08/10/2020

## Overview

Ever have that issue where you and your pals are up for playing something, but actually choosing a game is an absolute nightmare? The boys want to play The Forest, but Andy is cheap and hasn't bought it yet. Loke is dying to play Rocket League, but the thought of losing 0-8 to a bunch of 12 year olds who spent way too long practicing air dribbling fills you with despair. Alex still wants to finish Overcooked 2, knowing full well the group might not survive another session of Loke haphazardly throwing frozen discs of meat around the kitchen with the enthusiasm, but not the accuracy, of an NFL quarterback. Joey would have been happy just playing Minecraft, but you all forgot it existed, and this app only supports Steam games. Whoops.

Games With Friends lets you enter the steam URLs of you and your friends, and shows you a list of games that you all own. You and your friends will then be able to vote separately on which games you'd like to play, and the results will be displayed at the end for everyone to see. By choosing a game this way, it makes your options clear, since you know that everyone actually owns the games shown, and can also act as a reminder for older games you might have forgotten about. This should make the entire selection experience much less painful. At least, until you realise that someone forgot to buy the latest DLC for the one you picked.

## Non Goals

- This won't support game libraries other than Steam (e.g. Origin, Epic Games Store, Gog Galaxy, etc)

## Design

### Part 1

Once users arrive on the site, they will see the home page:

![Page 1](/images/1.png)

- If the user clicks "Add another friend", another input box will be added (just like the second input box shown)
- If the user clicks "Generate links" without entering a valid Steam URL in both input boxes, an error message will display under the offending input box that will read "Please input a valid Steam URL".
- If the user clicks "Generate links" and the Steam URLs entered are valid, the next page will be displayed.

A valid page should look like this:

![Page 2](images/2.png)

### Part 2

Once the links have been generated, the user should see this page:

![Page 3](images/3.png)

The user must then send each link to the associated friend. There will be a button within the input box to allow the user to easily copy the link to their clipboard. The input boxes should be read only.

- If the user clicks "Choose games", the next page will be displayed.
- When a friend opens the provided link, they will be taken directly to the next page.

### Part 3

Both the user and each friend should now see this page:

![Page 4](images/4.png)

