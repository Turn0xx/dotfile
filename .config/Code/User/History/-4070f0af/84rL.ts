import { MessageRepository } from "../message.repository";
import { MessageText } from "../../domain/message";

import { MessageDoesNotExistError } from "../../errors/message-not-exist.error";

export type EditMessageCommand = {
  messageId: string;
  author: string;
  newText: string;
};

export class EditMessageUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async handle(editMessageCommand: EditMessageCommand): Promise<void> {
    const messageText = MessageText.of(editMessageCommand.newText);

    const message = await this.messageRepository.getMessageById(
      editMessageCommand.messageId
    );

    if (!message) {
      throw new MessageDoesNotExistError();
    }

    const updateMessage = message.mutateText(editMessageCommand.newText)


    await this.messageRepository.updateMessage(updateMessage);
  }
}
