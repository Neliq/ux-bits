# ux bits

**A collection of UX-focused React components built with [shadcn/ui](https://ui.shadcn.com/), designed for rapid integration and best practices.**

---

## ✨ Features

- **UX-Focused**: Curated components that follow modern UX patterns and accessibility best practices.
- **Built with shadcn/ui**: Leverages the power and flexibility of the shadcn/ui component system.
- **Easy CLI Installation**: Add components to your project in seconds using the CLI.
- **Customizable & Production-Ready**: Easily theme and extend components to fit your needs.
- **Growing Library**: New components and improvements added regularly.

## 🚀 Installation

You can easily install any component from this collection using the shadcn/ui CLI:

```bash
npx shadcn@latest add https://ux.koszyka.com/r/<component-name>.json
```

Replace `<component-name>` with the name of the component you want to add (e.g., `WordsCountingCard`).

## 📦 Usage

After installation, simply import and use the component in your project:

```tsx
import { WordsCountingCard } from "@/Bits/WordsCountingCard";

export default function Example() {
  return (
    <WordsCountingCard
      href="/utilities/sample-article"
      title="Sample Article"
      description="Some description goes here"
      image="/sample-thumbnail.png"
      className="max-w-lg w-full"
    />
  );
}
```

Explore the `Bits/` and `Examples/` directories for more ready-to-use components!

## 🤝 Contributing

Contributions are welcome! If you have a UX component or improvement to share, please open an issue or submit a pull request.

1. Fork the repo and create your branch from `main`.
2. Follow the coding style and conventions used in the repo (shadcn/ui best practices).
3. Add source code to /Bits directory.
4. Add example usage to /Examples directory.
5. Append /lib/collection-examples.tsx with docs.
6. Submit your PR for review.

If you have an idea for component open new issue.

1. Provide example site using the solution
2. Add description explaining behavior / appearance / usage

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
