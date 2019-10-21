# cron parser exercize

This project will parse a command line and will output the parsed values.

## Requirements to run

you only need node >= v10

## Requirements to run tests

You need have yarn or npm to install deps.

with yarn:

```bash
yarn install
yarn test
```

with npm:

```bash
npm install
npm run test
```

## know bugs

bash and zsh will replace '\*' with all files in the current directory, so it doesn't work properly.

## running

```bash
./cron_parser.sh  */10 1,3,4 */5 1-2 2-3 ./command.sh
```

the output will be:

```text
minute        0, 10, 20, 30, 40, 50
hour          1, 3, 4
day of month  0, 5, 10, 15, 20, 25, 30
month         1, 2
day of week   2, 3
command       ./command.sh
```
