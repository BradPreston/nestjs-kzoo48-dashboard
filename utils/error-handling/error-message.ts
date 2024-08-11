import { BadRequestException } from '@nestjs/common';

export function clientValidationErrorMessage(error: Error) {
  const createErrorMessage = error.message.split('\n');
  throw new BadRequestException(
    createErrorMessage[createErrorMessage.length - 1],
  );
}
