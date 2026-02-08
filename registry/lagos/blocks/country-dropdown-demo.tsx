"use client";

import React, { useState } from "react";
import { CountryDropdown, Country } from "@/registry/lagos/ui/country-dropdown";

export default function CountryDropdownDemo() {
  const [country, setCountry] = useState<Country | undefined>(undefined);

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-lg border p-8 shadow-sm">
      <div className="w-full max-w-xs">
        <CountryDropdown
          onChange={(c) => setCountry(c)}
          defaultValue="US"
          placeholder="Select a country"
        />
      </div>
      {country && (
        <div className="text-center text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium text-foreground">{country.name}</span> (
          {country.alpha2})
        </div>
      )}
    </div>
  );
}
