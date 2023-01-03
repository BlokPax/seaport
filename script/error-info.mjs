import fs from 'fs';
import { ErrorDecoder, FileUtils } from 'contract-utils';

const currentDir = FileUtils.getDirFromUrl(import.meta.url);
const fsUtils = new FileUtils(currentDir);

const ifacePath = '../contracts/interfaces';

// eslint-disable-next-line max-len
// const errorData = '0x0d35e921000000000000000000000000000000000000000000000000011c37937e0800000000000000000000000000000000000000000000000000000000000000000000';
const errorData = process.argv[2];

// read in all solidity files that contain error definitions for these contracts
const files = fs.readdirSync(`${currentDir}/${ifacePath}`);
const contents = files.map((filename) => fsUtils.readFromFile(ifacePath, filename));
const combined = contents.join('\n');

const decoder = new ErrorDecoder(combined);

console.log(decoder.decodeError(errorData));
