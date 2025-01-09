import { PROVIDERS } from "../../pocket-ticket/client/providers-strings";

const dateProvider = {
  provide: PROVIDERS.DATE_PROVIDER,
  useFactory: () => {
    return new RealDateProvider();
  },
};