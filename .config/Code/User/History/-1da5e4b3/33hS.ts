import { readdirSync, statSync } from "fs";
import { join } from "path";
import { BaseEvent } from "./base-event";
import { Client, ClientEvents } from "discord.js";
import { EventsFinder } from "./events-finder";

export interface EventRegistrer {
    load_events(): void;
}

export class EventRegistrerImpl implements EventRegistrer {
    private events: BaseEvent[] = [];

    constructor(
        private client: Client,
        private events_finder: EventsFinder,
    ) { }

    public load_events() {
        let events = this.events_finder.find_events();

        if (events.isNone()) {
            return;
        }

        this.events = events.unwrap();

        this.events.forEach((event) => {
            console.log(`Registering event: ${event.event_name}`);
            this.client.on(event.name as keyof ClientEvents, event.handler);
        });
    }
}
