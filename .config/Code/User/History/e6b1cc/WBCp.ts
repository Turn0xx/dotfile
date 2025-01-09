import { PROVIDERS } from "../../pocket-ticket/client/providers-strings";
import { RealDateProvider } from "../date-provider";

export const dateProvider = {
  provide: PROVIDERS.DATE_PROVIDER,
  useFactory: () => {
    return new RealDateProvider();
  },
};