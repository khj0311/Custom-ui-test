# Custom UI Test

Custom UI components based on Material UI with Storybook.

## Features

- React components based on Material UI
- Customizable styling with Styled Components
- TypeScript support
- Storybook for component documentation and testing
- Ready to be published as an npm package

## Getting Started

### Installation

```bash
npm install
```

### Development

Run Storybook to develop and test components:

```bash
npm run storybook
```

### Build

Build the library for production:

```bash
npm run build
```

## Usage

After installing the package in your project:

```jsx
import { Button, TextField } from 'custom-ui-test';

function App() {
  return (
    <div>
      <Button variant="contained" color="primary">Click Me</Button>
      <TextField label="Name" />
    </div>
  );
}
```

## Components

- Basic Elements: Button, Input, TextField
- Layout: Columns, Grid
- Media: Carousel, Video Player
- Features: Cards, Modals

## License

MIT
