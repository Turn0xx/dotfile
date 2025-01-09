import { Client, ClientOptions } from "discord.js";
import { EventsFinderImpl } from "./events-finder";
import { EventRegistrerImpl } from "./event-registrer";

export class DiscordClient {
  private static instance: Client;
  private static init_count = 0;

  private constructor() { }

  public static getInstance(): Client {
    if (!DiscordClient.instance) {
      throw new Error("DiscordClient is not initialized");
    }
    return DiscordClient.instance;
  }

  public static init(options: ClientOptions): Client {
    if (DiscordClient.init_count > 0) {
      throw new Error("DiscordClient is already initialized");
    }

    if (!DiscordClient.instance) {
      DiscordClient.instance = new Client(options);

      DiscordClient.instance.once("ready", (readyClient) => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);

        console.log(`Registring event listners ...`);
      });
    }

    DiscordClient.init_count++;

    const eventsRegistrer = new EventRegistrerImpl(
      DiscordClient.instance,
      new EventsFinderImpl(),
    );

    eventsRegistrer.load_events();

    return DiscordClient.instance;
  }
}
