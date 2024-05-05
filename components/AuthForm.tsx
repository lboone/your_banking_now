"use client";
import React, { useState } from "react";
import SiteLogo from "./SiteLogo";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SiteFormField from "./SiteFormField";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const authFormSchema = (type: string) => z.object({
  // Sign Up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  state: type === 'sign-in' ? z.string().optional() : z.string().length(2),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().date(),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),

  // Both
  email: z.string().email(),
  password: z.string().min(8),
});

const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setuser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
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
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                  <SiteFormField
                    form={form}
                    fieldName="firstName"
                    fieldLabel="First Name"
                    inputType="text"
                    inputPlaceholder="Enter your first name"
                  />

                  <SiteFormField
                    form={form}
                    fieldName="lastName"
                    fieldLabel="Last Name"
                    inputType="text"
                    inputPlaceholder="Enter your last name"
                  />
                  </div>


                  <SiteFormField
                    form={form}
                    fieldName="address1"
                    fieldLabel="Address"
                    inputType="text"
                    inputPlaceholder="Enter your address"
                  />
                  <div className="flex gap-4">
                  <SiteFormField
                    form={form}
                    fieldName="state"
                    fieldLabel="State"
                    inputType="text"
                    inputPlaceholder="ex: NY"
                  />

                  <SiteFormField
                    form={form}
                    fieldName="postalCode"
                    fieldLabel="Postal Code"
                    inputType="text"
                    inputPlaceholder="ex: 11101"
                  />
                  </div>
                 <div className="flex gap-4">
                 <SiteFormField
                    form={form}
                    fieldName="dateOfBirth"
                    fieldLabel="Date of Birth"
                    inputType="text"
                    inputPlaceholder="yyyy-mm-dd"
                  />
                  <SiteFormField
                    form={form}
                    fieldName="ssn"
                    fieldLabel="SSN"
                    inputType="text"
                    inputPlaceholder="ex: 1234"
                  />
                 </div>
              </>
              )}


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
              <div className="flex flex-col gap-4">
              <Button className="form-btn" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
