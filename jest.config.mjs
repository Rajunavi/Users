// jest.config.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],

   // other configurations
  transformIgnorePatterns: [
    "node_modules/(?!(@babel/runtime|@babel/polyfill)/)",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "jest-transform-stub",
    "\\.(css|less)$": "identity-obj-proxy"
  }
};
