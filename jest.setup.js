import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();


global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

