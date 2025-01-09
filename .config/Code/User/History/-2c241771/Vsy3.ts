type ParsingError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};


export class ParsingHandler {
  
  static mapError(error: ParsingError[]): void {
    throw new ZodParsingError(error);
  }
}

export class ZodParsingError extends Error {
  constructor(public error: ParsingError[]) {
    super(error as unknown as string);
  }
}

export To map the error array you've provided into a format that's useful for the client, you'll want to transform it into a more human-readable form or into a structure that's more aligned with the client's needs for error handling and display. NestJS offers several ways to handle errors and customize error responses, utilizing exceptions and filters. Here's a general approach to map and return this error array properly to the client in a NestJS application.

### Step 1: Define a Custom Exception

First, define a custom exception class that extends `HttpException` to encapsulate your error structure. This allows you to throw it anywhere in your application, and it will be caught by NestJS's exception layer.

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: any[]) {
    super({ message: 'Validation failed', errors }, HttpStatus.BAD_REQUEST);
  }
}
```

### Step 2: Create a Validation Error Mapping Function

Create a function to map your raw error structure into a more descriptive or simplified format that the client can easily interpret. The function will iterate over your error array, transforming each error into a client-friendly message.

```typescript
function mapValidationErrors(errors: any[]): any[] {
  return errors.map(error => ({
    field: error.path.join('.'),
    message: `${error.message}: expected ${error.expected} but received ${error.received}`,
  }));
}
```

### Step 3: Use Your Custom Exception

When you catch a validation error (like the one you have), map the errors using the function from Step 2, and then throw a `ValidationException` with the mapped errors.

```typescript
const rawErrors = [/* your error array */];

// Map the raw errors to a more client-friendly format
const errors = mapValidationErrors(rawErrors);

// Throw a custom exception with the mapped errors
throw new ValidationException(errors);
```

### Step 4: Exception Filter (Optional)

If you need further customization of how exceptions are sent to the client, you can implement a custom `ExceptionFilter`. This step is optional but useful if you want to log errors, change the response format, or handle different types of errors differently.

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ValidationException } from './validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        ...exception.getResponse(),
      });
  }
}
```

Don't forget to bind your filter globally or to specific controllers using `@UseFilters()` decorator.

This approach gives you a flexible way to handle and format validation errors (or any errors) in NestJS, making the error information both useful and accessible to the client.
