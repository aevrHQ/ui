# Aevr UI Registry

## Installation with Namespace

To use the Aevr UI registry with namespace support, add the following configuration to your `components.json` file:

```json
{
  "registries": {
    "@aevr": "https://v1.ui.aevr.space/r/{name}.json"
  }
}
```

Then install components using the namespace:

```bash
npx shadcn@latest add @aevr/info-box
npx shadcn@latest add @aevr/button
npx shadcn@latest add @aevr/card
```

## Available Components

You can view all available components at: <https://v1.ui.aevr.space>

## Alternative Installation

You can also install components directly using the full URL:

```bash
npx shadcn@latest add https://v1.ui.aevr.space/r/info-box.json
```
