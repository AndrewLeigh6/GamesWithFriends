import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("categories_games").del();
  await knex("games_users").del();
  await knex("sessions_users").del();
  await knex("users").del();
  await knex("games").del();
  await knex("sessions").del();
  await knex("categories").del();

  // users
  const userIds = await knex("users")
    .returning("id")
    .insert([
      { steam_id: "76561198005385194", steam_username: "silverstone1294" },
      { steam_id: "76561198026097782", steam_username: "loke1104" },
      { steam_id: "76561198043111099", steam_username: "eatenbyduckpeople" },
      { steam_id: "76561198032462112", steam_username: "dendromight" },
    ]);

  // games
  const gameIds = await knex("games")
    .returning("id")
    .insert([
      {
        name: "Fall Guys: Ultimate Knockout",
        image_vertical_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/library_600x900.jpg?t=1608073830",
        image_horizontal_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/capsule_467x181.jpg?t=1592241545",
      },
      {
        name: "Terraria",
        image_vertical_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg?t=1568056870",
        image_horizontal_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/capsule_467x181.jpg?t=1435630291",
      },
      {
        name: "Deep Rock Galactic",
        image_vertical_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/548430/library_600x900.jpg?t=1589956042",
        image_horizontal_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/548430/capsule_467x181.jpg?t=1572877557",
      },
      {
        name: "Rocket League",
        image_vertical_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/252950/library_600x900.jpg?t=1607529666",
        image_horizontal_url:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/252950/capsule_467x181.jpg?t=1585152351",
      },
    ]);

  // categories
  const categoryIds = await knex("categories")
    .returning("id")
    .insert([
      {
        name: "Full controller support",
      },
      {
        name: "Online PvP",
      },
      {
        name: "Online Co-op",
      },
    ]);

  // sessions
  const sessionIds = await knex("sessions")
    .returning("id")
    .insert([{ host_id: userIds[0] }]);

  // sessions_users
  const sessionsUsers = await knex("sessions_users").insert([
    { session_id: sessionIds[0], user_id: userIds[0] },
    { session_id: sessionIds[0], user_id: userIds[1] },
    { session_id: sessionIds[0], user_id: userIds[2] },
    { session_id: sessionIds[0], user_id: userIds[3] },
  ]);

  // categories_games
  const categoriesGames = [
    { game_id: gameIds[0], category_id: categoryIds[0] },
    { game_id: gameIds[0], category_id: categoryIds[1] },
    { game_id: gameIds[0], category_id: categoryIds[2] },
    { game_id: gameIds[1], category_id: categoryIds[0] },
    { game_id: gameIds[1], category_id: categoryIds[1] },
    { game_id: gameIds[1], category_id: categoryIds[2] },
    { game_id: gameIds[2], category_id: categoryIds[0] },
    { game_id: gameIds[2], category_id: categoryIds[2] },
    { game_id: gameIds[3], category_id: categoryIds[0] },
    { game_id: gameIds[3], category_id: categoryIds[1] },
    { game_id: gameIds[3], category_id: categoryIds[2] },
  ];

  await knex("categories_games").insert(categoriesGames);

  // games_users
  const gamesUsers = [
    { game_id: gameIds[0], user_id: userIds[0] },
    { game_id: gameIds[1], user_id: userIds[0] },
    { game_id: gameIds[2], user_id: userIds[0] },
    { game_id: gameIds[3], user_id: userIds[0] },
    { game_id: gameIds[0], user_id: userIds[1] },
    { game_id: gameIds[1], user_id: userIds[1] },
    { game_id: gameIds[2], user_id: userIds[2] },
    { game_id: gameIds[3], user_id: userIds[2] },
    { game_id: gameIds[0], user_id: userIds[3] },
    { game_id: gameIds[3], user_id: userIds[3] },
  ];

  await knex("games_users").insert(gamesUsers);
}
