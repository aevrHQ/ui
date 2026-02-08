"use client";

import React, { useState } from "react";
import { MinimalCurrencySelect } from "@/registry/lagos/ui/currency-select";

export default function CurrencySelectDemo() {
  const [currency, setCurrency] = useState<string>("");

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-lg border p-8 shadow-sm">
      <div className="w-full max-w-xs">
        <MinimalCurrencySelect
          onChange={(c) => setCurrency(c)}
          defaultValue="USD"
          placeholder="Select currency"
        />
      </div>
      {currency && (
        <div className="text-center text-sm text-muted-foreground">
          Selected Currency:{" "}
          <span className="font-medium text-foreground">{currency}</span>
        </div>
      )}
    </div>
  );
}
