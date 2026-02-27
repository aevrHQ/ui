"use client";

import React from "react";
import {
  SettingsCard,
  SettingsCardHeader,
  SettingsCardTitle,
  SettingsCardDescription,
  SettingsCardContent,
  SettingsRow,
  SettingsRowContent,
  SettingsRowLabel,
  SettingsRowValue,
  SettingsRowAction,
} from "@/registry/lagos/ui/settings-card";

export default function SettingsCardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <SettingsCard className="w-full max-w-lg">
        <SettingsCardHeader>
          <SettingsCardTitle>Notifications</SettingsCardTitle>
          <SettingsCardDescription>
            Manage your notification preferences and how you want to be
            contacted.
          </SettingsCardDescription>
        </SettingsCardHeader>
        <SettingsCardContent>
          <SettingsRow>
            <SettingsRowContent>
              <div>
                <SettingsRowLabel>Email Notifications</SettingsRowLabel>
                <SettingsRowValue>
                  Receive daily email summaries of your activity.
                </SettingsRowValue>
              </div>
            </SettingsRowContent>
            <SettingsRowAction>
              <div className="h-5 w-9 rounded-full bg-primary/20 p-0.5">
                <div className="h-4 w-4 rounded-full bg-primary" />
              </div>
            </SettingsRowAction>
          </SettingsRow>
          <SettingsRow>
            <SettingsRowContent>
              <div>
                <SettingsRowLabel>Push Notifications</SettingsRowLabel>
                <SettingsRowValue>
                  Get real-time alerts on your mobile device.
                </SettingsRowValue>
              </div>
            </SettingsRowContent>
            <SettingsRowAction>
              <div className="h-5 w-9 rounded-full bg-muted p-0.5">
                <div className="h-4 w-4 rounded-full bg-background shadow-sm" />
              </div>
            </SettingsRowAction>
          </SettingsRow>
        </SettingsCardContent>
      </SettingsCard>
    </div>
  );
}
