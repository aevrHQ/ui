import {
  EmptyState,
  CardApplyEmpty,
  TransactionsEmpty,
  NoResultsEmpty,
  NoDataEmpty,
} from "@/registry/lagos/ui/empty-state";
import { Add, Refresh, Settings } from "iconsax-react";

export default function EmptyStateExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* Basic Usage */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Empty States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default variant */}
          <EmptyState
            title="Get Started"
            description="Create your first item to begin"
            primaryAction={{
              label: "Create Item",
              onClick: () => console.log("Create clicked"),
              icon: (
                <Add className="h-4 w-4" variant="Bulk" color="currentColor" />
              ),
              iconPosition: "start",
            }}
          />

          {/* Info variant */}
          <EmptyState
            variant="info"
            title="Information"
            description="This feature is currently in development"
            size="sm"
          />
        </div>
      </section>

      {/* Status Variants */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Status Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EmptyState
            variant="success"
            title="All Done!"
            description="Everything is up to date"
            size="sm"
          />

          <EmptyState
            variant="warning"
            title="Attention Needed"
            description="Please review your settings"
            size="sm"
          />

          <EmptyState
            variant="error"
            title="Error Occurred"
            description="Something went wrong"
            size="sm"
          />

          <EmptyState
            variant="info"
            title="Pro Tip"
            description="Use keyboard shortcuts"
            size="sm"
          />
        </div>
      </section>

      {/* Preset Components */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Preset Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Apply */}
          <CardApplyEmpty />

          {/* Transactions */}
          <TransactionsEmpty />

          {/* No Results */}
          <NoResultsEmpty
            primaryAction={{
              label: "Reset Search",
              onClick: () => console.log("Reset"),
              icon: (
                <Refresh
                  className="h-4 w-4"
                  variant="Bulk"
                  color="currentColor"
                />
              ),
            }}
          />

          {/* No Data */}
          <NoDataEmpty
            primaryAction={{
              label: "Import Data",
              onClick: () => console.log("Import"),
            }}
          />
        </div>
      </section>

      {/* Horizontal Layout */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Horizontal Layout</h2>

        <EmptyState
          layout="horizontal"
          title="No Projects Yet"
          description="Create your first project to start organizing your work and collaborating with your team"
          primaryAction={{
            label: "New Project",
            onClick: () => console.log("New project"),
            icon: (
              <Add className="h-4 w-4" variant="Bulk" color="currentColor" />
            ),
          }}
          secondaryAction={{
            label: "Import Project",
            variant: "secondary",
            onClick: () => console.log("Import"),
          }}
        />
      </section>

      {/* With Multiple Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Multiple Actions</h2>

        <EmptyState
          title="No Settings Configured"
          description="Configure your application settings to get started"
          size="lg"
          actions={[
            {
              label: "Quick Setup",
              variant: "primary",
              onClick: () => console.log("Quick setup"),
            },
            {
              label: "Advanced Setup",
              variant: "secondary",
              onClick: () => console.log("Advanced setup"),
              icon: (
                <Settings
                  className="h-4 w-4"
                  variant="Bulk"
                  color="currentColor"
                />
              ),
            },
            {
              label: "Import Settings",
              variant: "ghost",
              onClick: () => console.log("Import"),
            },
          ]}
        />
      </section>

      {/* Custom Content */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Content</h2>

        <EmptyState
          title="Subscribe to Premium"
          description="Unlock advanced features and unlimited access"
          size="lg"
          fullHeight
        >
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>✓ Unlimited projects</p>
            <p>✓ Advanced analytics</p>
            <p>✓ Priority support</p>
            <p>✓ Custom branding</p>
          </div>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition">
            Upgrade Now
          </button>
        </EmptyState>
      </section>

      {/* Different Sizes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Size Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EmptyState size="sm" title="Small" description="Compact size" />

          <EmptyState size="md" title="Medium" description="Default size" />

          <EmptyState size="lg" title="Large" description="Spacious size" />

          <EmptyState
            size="xl"
            title="Extra Large"
            description="Maximum size"
          />
        </div>
      </section>

      {/* With Custom Card Props */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Card Props</h2>

        <EmptyState
          title="Floating Card"
          description="This empty state uses custom card properties"
          primaryAction={{
            label: "Get Started",
            onClick: () => console.log("Started"),
          }}
        />
      </section>

      {/* Without Border */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Borderless</h2>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <EmptyState
            title="Clean Look"
            description="No border for minimal design"
            primaryAction={{
              label: "Continue",
              onClick: () => console.log("Continue"),
            }}
          />
        </div>
      </section>
    </div>
  );
}
