import { MessageTooLongError } from "../errors/message-to-long.error";
import { EmptyMessageError } from "../errors/empty-message.error";

// export type Message = {
//   id: string;
//   text: MessageText;
//   author: string;
//   date: Date;
// };

export type MessageJSON = {
  id: string;
  text: string;
  author: string;
  date: string;
};

export class Message {
  private constructor(
    private readonly _id: string,
    private readonly _text: MessageText,
    private readonly _author: string,
    private readonly _date: Date
  ) {}

  public static fromJSON(json: MessageJSON) {
    return new Message(
      json.id,
      MessageText.of(json.text),
      json.author,
      new Date(json.date)
    );
  }

  public get id() {
    return this._id;
  }

  public get text() {
    return this._text;
  }

  public get author() {
    return this._author;
  }

  public get date() {
    return this._date;
  }

  public toJSON(): MessageJSON {
    return {
      id: this._id,
      text: this._text.getText(),
      author: this.author,
      date: this._date.toISOString(),
    };
  }

  public mutateText(text: string) {
    const messageText = MessageText.of(text);

    return new Message(this._id, messageText, this._author, this._date);
  }
}

export class MessageText {
  private constructor(private readonly value: string) {}

  static of(text: string) {
    const trimedText = text.trim();

    if (text.length > 280) {
      throw new MessageTooLongError();
    }

    if (trimedText.length === 0) {
      throw new EmptyMessageError();
    }

    return new MessageText(text);
  }

  public getText() {
    return this.value;
  }
}
