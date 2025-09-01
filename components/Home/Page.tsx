// ./components/Home/Page.tsx

"use client";

import * as React from "react";
import { useState } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  Package,
  Code,
  Zap,
  Shield,
  Terminal,
  ArrowRight,
  Github,
  Download,
  Settings,
} from "lucide-react";
import { Button } from "@/registry/lagos/ui/button";
import { InfoBox } from "@/registry/lagos/ui/info-box";
import Loader from "@/registry/lagos/ui/loader";
import SummaryCard from "@/registry/lagos/ui/summary-card";
import { Card, CardGrid } from "@/registry/lagos/ui/card";

// Copy button component
const CopyButton: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      size={"sm"}
      className={`inline-flex  transition-colors ${className || ""}`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};

// Code block component
const CodeBlock: React.FC<{ children: string; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-700">
          <span className="text-sm font-mono">{title}</span>
          <CopyButton text={children} />
        </div>
      )}
      <pre
        className={`bg-gray-900 text-gray-100 p-4 ${
          title ? "rounded-b-lg" : "rounded-lg"
        } overflow-x-auto text-sm`}
      >
        <code>{children}</code>
      </pre>
      {!title && (
        <CopyButton
          text={children}
          className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-gray-200"
        />
      )}
    </div>
  );
};

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState<
    "quick-start" | "components" | "utils"
  >("quick-start");

  const components = [
    {
      name: "button",
      title: "Button",
      description:
        "A versatile button component with multiple variants and sizes",
      preview: <Button variant="primary">Click me</Button>,
    },
    {
      name: "card",
      title: "Card",
      description:
        "Flexible card component with support for actions, media, and various layouts",
      preview: (
        <Card
          title="Sample Card"
          subtitle="This is a preview"
          icon={<Package className="w-4 h-4" />}
        >
          <p className="text-sm">Card content goes here</p>
        </Card>
      ),
    },
    {
      name: "info-box",
      title: "Info Box",
      description: "Display information, warnings, errors, and status messages",
      preview: (
        <InfoBox
          type="success"
          title="Success!"
          description="Operation completed successfully"
        />
      ),
    },
    {
      name: "loader",
      title: "Loader",
      description: "Animated loading spinner for async operations",
      preview: <Loader loading={true} />,
    },
    {
      name: "summary-card",
      title: "Summary Card",
      description: "Display summary information in an organized card format",
      preview: (
        <SummaryCard
          items={[
            {
              label: "Item 1",
              value: "Value 1",
            },
            {
              label: "Item 2",
              value: "Value 2",
            },
            {
              label: "Item 3",
              value: "Value 3",
            },
          ]}
          summary={{
            label: "Summary",
            value: "Summary Value",
          }}
        />
      ),
    },
  ];

  const utils = [
    {
      name: "number-formatter",
      title: "Number Formatter",
      description:
        "Format numbers, currencies, and card numbers with locale support",
      features: [
        "Currency formatting",
        "Number formatting",
        "Card number masking",
        "Locale support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden text-blue-50">
        <div className="absolute inset-0 bg-blue-600"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              Custom shadcn/ui Registry
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold font-heading tracking-tighter mb-6">
              aevr/ui
            </h1>

            <p className="text-xl mb-8 max-w-2xl mx-auto">
              A collection of beautiful, accessible, and production-ready
              components built on top of shadcn/ui. Get started in seconds.
            </p>

            <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Terminal className="w-5 h-5" />
                Get Started
              </Button>
              <Button variant="secondary" size="lg">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section using Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10 mb-12">
        <CardGrid cols={2} spacing="normal">
          <Card
            icon={<Download className="w-5 h-5" />}
            title="5+"
            subtitle="Components"
            variant="glass"
            elevation="floating"
            size="sm"
          />

          <Card
            icon={<Settings className="w-5 h-5" />}
            title="TypeScript"
            subtitle="First"
            variant="glass"
            elevation="floating"
            size="sm"
          />
        </CardGrid>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border">
          {[
            { id: "quick-start", label: "Quick Start", icon: Zap },
            { id: "components", label: "Components", icon: Package },
            { id: "utils", label: "Utilities", icon: Code },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() =>
                setSelectedTab(id as "quick-start" | "components" | "utils")
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTab === id
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Quick Start Tab */}
        {selectedTab === "quick-start" && (
          <div className="space-y-8">
            <CardGrid cols={2} spacing="normal">
              {/* Prerequisites Card */}
              <Card
                title="Prerequisites"
                headerDirection="col"
                icon={<Shield className="w-5 h-5" />}
                variant="primary"
              >
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Next.js 13+ project
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Tailwind CSS configured
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    shadcn/ui initialized
                  </li>
                </ul>
              </Card>

              {/* Quick Install Card */}
              <Card
                title="Quick Install"
                headerDirection="col"
                icon={<Zap className="w-5 h-5" />}
                variant="success"
              >
                <p className="text-gray-600 mb-4">
                  Add any component with one command:
                </p>
                <CodeBlock>npx shadcn@latest add @aevr/button</CodeBlock>
              </Card>
            </CardGrid>

            {/* Setup Instructions */}
            <Card
              title="Setup Instructions"
              headerDirection="col"
              icon={<Terminal className="w-6 h-6" />}
              variant="default"
              size="lg"
            >
              <div className="flex flex-col gap-4 mt-4">
                {/* Step 1: shadcn/ui Setup */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <h4 className="text-lg font-semibold">
                      Setup shadcn/ui (if not already done)
                    </h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      If you haven&apos;t set up shadcn/ui in your project yet,
                      run:
                    </p>
                    <CodeBlock title="terminal">
                      npx shadcn@latest init
                    </CodeBlock>

                    <InfoBox
                      type="info"
                      description="Follow the prompts to configure your project. Choose your style, colors, and other preferences."
                    />
                  </div>
                </div>

                {/* Step 2: Configure Registry */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <h4 className="text-lg font-semibold">
                      Configure Custom Registry
                    </h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      Add the aevr registry to your{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        components.json
                      </code>{" "}
                      file:
                    </p>

                    <CodeBlock title="components.json">{`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@aevr": "https://v1.ui.aevr.space/r/{name}.json"
  }
}`}</CodeBlock>
                  </div>
                </div>

                {/* Step 3: Install Dependencies */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <h4 className="text-lg font-semibold">
                      Install Registry Dependencies
                    </h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      Install the required dependencies for aevr components:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">npm:</p>
                        <CodeBlock>
                          npm install class-variance-authority tw-animate-css
                          iconsax-react iso-country-currency @untools/logger
                        </CodeBlock>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">yarn:</p>
                        <CodeBlock>
                          yarn add class-variance-authority tw-animate-css
                          iconsax-react iso-country-currency @untools/logger
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Add Components */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <h4 className="text-lg font-semibold">Add Components</h4>
                  </div>

                  <div className="pl-11 space-y-4">
                    <p className="text-gray-600">
                      Now you can add any component from the aevr registry:
                    </p>

                    <div className="space-y-3">
                      <CodeBlock title="Add a single component">
                        npx shadcn@latest add @aevr/button
                      </CodeBlock>
                      <CodeBlock title="Add multiple components">
                        npx shadcn@latest add @aevr/button @aevr/info-box
                        @aevr/loader @aevr/card
                      </CodeBlock>
                      <CodeBlock title="Add utilities">
                        npx shadcn@latest add @aevr/number-formatter
                      </CodeBlock>
                    </div>

                    <InfoBox
                      type="success"
                      title="That's it!"
                      description="Components will be installed to your components/ui/ directory and utilities to utils/. Start using them in your project immediately."
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Usage Example */}
            <Card
              title="Usage Example"
              headerDirection="col"
              icon={<Code className="w-6 h-6" />}
              variant="success"
              size="lg"
            >
              <div className="space-y-4 mt-2">
                <p className="text-gray-600">
                  After installation, import and use components in your React
                  components:
                </p>

                <CodeBlock title="app/page.tsx">{`import { Button } from "@/components/ui/button";
import { InfoBox } from "@/components/ui/info-box";
import { Card, CardGrid } from "@/components/ui/card";
import { formatCurrency } from "@/utils/number-formatter";

export default function Page() {
  const price = formatCurrency(1234.56, { currency: "USD" });
  
  return (
    <div className="p-6">
      <Card
        title="Welcome to aevr/ui!"
        subtitle="Your components are ready to use"
        variant="success"
        
        icon={<Package className="w-5 h-5" />}
        actions={[
          { name: "Get Started", type: "primary", path: "/docs" },
          { name: "View Examples", type: "secondary", path: "/examples" }
        ]}
      >
        <InfoBox 
          type="success"
          description="All aevr components are now available in your project."
        />
        
        <Button variant="primary" className="mt-4">
          Buy for {price}
        </Button>
      </Card>
    </div>
  );
}`}</CodeBlock>
              </div>
            </Card>
          </div>
        )}

        {/* Components Tab */}
        {selectedTab === "components" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Available Components</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Production-ready components built with accessibility and
                customization in mind. Each component follows shadcn/ui patterns
                and conventions.
              </p>
            </div>

            <CardGrid cols={1} spacing="normal">
              {components.map((component) => (
                <Card
                  key={component.name}
                  title={component.title}
                  subtitle={component.description}
                  badge={
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-mono">
                      {component.name}
                    </span>
                  }
                  variant="default"
                  horizontal={true}
                  actions={[
                    {
                      name: "Install",
                      type: "primary",
                      onClick: () => {
                        navigator.clipboard.writeText(
                          `npx shadcn@latest add @aevr/${component.name}`
                        );
                      },
                    },
                    {
                      name: "View Docs",
                      type: "secondary",
                      path: `/docs/components/${component.name}`,
                    },
                  ]}
                >
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-center min-h-[120px] w-full">
                    {component.preview}
                  </div>
                </Card>
              ))}
            </CardGrid>
          </div>
        )}

        {/* Utils Tab */}
        {selectedTab === "utils" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Utility Functions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Helpful utility functions to enhance your development workflow.
                These utilities handle common tasks like formatting and
                validation.
              </p>
            </div>

            <CardGrid cols={1} spacing="normal">
              {utils.map((util) => (
                <Card
                  key={util.name}
                  title={util.title}
                  subtitle={util.description}
                  badge={
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-mono">
                      {util.name}
                    </span>
                  }
                  variant="default"
                  actions={[
                    {
                      name: "Install",
                      type: "primary",
                      onClick: () => {
                        navigator.clipboard.writeText(
                          `npx shadcn@latest add @aevr/${util.name}`
                        );
                      },
                    },
                  ]}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Features:
                      </h4>
                      <ul className="space-y-2">
                        {util.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Installation:
                      </h4>
                      <CodeBlock>{`npx shadcn@latest add @aevr/${util.name}`}</CodeBlock>
                    </div>
                  </div>

                  {util.name === "number-formatter" && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Usage Examples:
                      </h4>
                      <CodeBlock>{`import { formatCurrency, formatNumber, formatCardNumber } from "@/utils/number-formatter";

// Currency formatting
formatCurrency(1234.56, { currency: "USD" }); // "$1,234.56"
formatCurrency(1234.56, { currency: "EUR", locale: "de-DE" }); // "1.234,56 €"

// Number formatting
formatNumber(1234.567, { maximumFractionDigits: 2 }); // "1,234.57"

// Card number formatting with masking
formatCardNumber("1234567890123456", { mask: true }); // "**** **** **** 3456"`}</CodeBlock>
                    </div>
                  )}
                </Card>
              ))}
            </CardGrid>
          </div>
        )}

        {/* Features Section using Cards */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Choose aevr/ui?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with modern development practices and designed for
              production use.
            </p>
          </div>

          <CardGrid cols={2} spacing="normal">
            <Card
              title="Easy Integration"
              subtitle="Seamless integration with existing shadcn/ui projects"
              icon={<Zap className="w-6 h-6" />}
              variant="success"
              elevation="floating"
            />

            <Card
              title="Customizable"
              subtitle="Built with CVA for easy customization and theming"
              icon={<Package className="w-6 h-6" />}
              variant="info"
              elevation="floating"
            />
          </CardGrid>
        </div>

        {/* Getting Help */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Need Help?</h3>

          <CardGrid cols={2} spacing="normal">
            <Card
              title="Documentation"
              subtitle="Check out the shadcn/ui documentation for general guidance on using components"
              icon={<ExternalLink className="w-4 h-4" />}
              variant="default"
              actions={[
                {
                  name: "View Docs",
                  type: "secondary",
                  path: "/docs",
                  icon: <ArrowRight className="w-4 h-4" />,
                },
              ]}
            />

            <Card
              title="Issues & Support"
              subtitle="Found a bug or have a feature request? Let us know on GitHub"
              icon={<Github className="w-4 h-4" />}
              variant="default"
              actions={[
                {
                  name: "GitHub Issues",
                  type: "secondary",
                  path: "https://github.com/aevr/registry/issues",
                  external: true,
                  icon: <ArrowRight className="w-4 h-4" />,
                },
              ]}
            />
          </CardGrid>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">aevr/ui</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Built with shadcn/ui</span>
              <span>•</span>
              <span>Powered by Next.js</span>
              <span>•</span>
              <a
                href="https://v1.ui.aevr.space"
                className="hover:text-blue-600 transition-colors"
              >
                v1.ui.aevr.space
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
