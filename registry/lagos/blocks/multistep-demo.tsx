"use client";

import React from "react";
import {
  MinimalMultiStep,
  MinimalStepProps,
} from "@/registry/lagos/ui/multistep";
import { Button } from "@/registry/lagos/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/registry/new-york/ui/label";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const Step1 = ({ values, setValues, next }: MinimalStepProps<FormValues>) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={values.firstName}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, firstName: e.target.value }))
          }
          placeholder="John"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={values.lastName}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, lastName: e.target.value }))
          }
          placeholder="Doe"
        />
      </div>
      <Button onClick={() => next()} className="w-full">
        Next
      </Button>
    </div>
  );
};

const Step2 = ({
  values,
  setValues,
  next,
  prev,
}: MinimalStepProps<FormValues>) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="john.doe@example.com"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={prev} className="flex-1">
          Back
        </Button>
        <Button onClick={() => next()} className="flex-1">
          Review
        </Button>
      </div>
    </div>
  );
};

const Step3 = ({ values, prev }: MinimalStepProps<FormValues>) => {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-muted p-4">
        <h3 className="mb-2 font-semibold">Summary</h3>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Name:</dt>
            <dd>
              {values.firstName} {values.lastName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Email:</dt>
            <dd>{values.email}</dd>
          </div>
        </dl>
      </div>
      <Button variant="secondary" onClick={prev} className="w-full">
        Back
      </Button>
      <Button className="w-full" onClick={() => alert("Submitted!")}>
        Submit
      </Button>
    </div>
  );
};

export default function MultistepDemo() {
  return (
    <div className="mx-auto w-full max-w-md rounded-lg border p-6 shadow-sm">
      <MinimalMultiStep
        title="Registration"
        description="Please fill out your simple details"
        steps={[Step1, Step2, Step3]}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        storageKey="demo-multistep"
      />
    </div>
  );
}
