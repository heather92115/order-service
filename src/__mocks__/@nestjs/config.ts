const config = {
  kafka: {},
};

export const registerAs = jest.fn();

export class ConfigService {
  get = jest.fn().mockImplementation((key) => config[key]);
}
