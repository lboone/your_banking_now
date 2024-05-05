"use client";
import React, { useState } from "react";
import SiteLogo from "./SiteLogo";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SiteFormField from "./SiteFormField";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setuser] = useState(null);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <SiteLogo
          linkClassName=" cursor-pointer items-center gap-1 flex"
          labelClassName="text-26 font-ibm-plex-serif text-black-1 font-bold"
        />
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex-flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <SiteFormField
                form={form}
                fieldName="email"
                fieldLabel="Email"
                inputType="email"
                inputPlaceholder="Enter your email"
              />
              <SiteFormField
                form={form}
                fieldName="password"
                fieldLabel="Password"
                inputType="password"
                inputPlaceholder="Enter your password"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
