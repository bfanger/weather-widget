# Weather Widget

A site where you can travel to the future and see weather information.
For details about the assignment see [assignment.md](./docs/assignment.md)

## Links

- [Production](https://weather.bfanger.nl/)
- [API Docs](https://docs.tomorrow.io/reference/weather-forecast)

## Dev setup

Install [pnpm](https://pnpm.io/) >= 12 and run:

```sh
pnpm dev
```

Open http://localhost:5173 in your browser.

As a fallback, the site loads with example data. To get updated weather information from [tomorrow.io](https://tomorrow.io/), create an account and place your API key in `.env.weather-widget` file next to this project:

```env
# ../.env.weather-widget
TOMORROW_IO_API_KEY=your_key_here
```
