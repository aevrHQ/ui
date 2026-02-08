"use client";

import React, { useState } from "react";
import { PhoneInput } from "@/registry/lagos/ui/phone-input";

export default function PhoneInputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-lg border p-8 shadow-sm">
      <div className="w-full max-w-xs">
        <PhoneInput
          value={value}
          onChange={setValue}
          defaultCountry="US"
          placeholder="Enter phone number"
        />
      </div>
      {value && (
        <div className="text-center text-sm text-muted-foreground">
          Value: <span className="font-medium text-foreground">{value}</span>
        </div>
      )}
    </div>
  );
}
