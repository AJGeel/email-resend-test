"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { phoneRegex } from "@/utils/regex";
import { useState } from "react";
import Loader from "@/components/Loader";

const GenericStringConstraint = z.string().min(2).max(50);

const formSchema = z.object({
  firstName: GenericStringConstraint,
  lastName: GenericStringConstraint,
  email: z.string().email().min(2).max(50),
  country: GenericStringConstraint,
  city: GenericStringConstraint,
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number."),
});

type FormField = {
  id: "firstName" | "lastName" | "email" | "country" | "city" | "phoneNumber";
  label: string;
  placeholder: string;
};

const formFields: FormField[] = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "John",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Doe",
  },
  {
    id: "email",
    label: "E-mail",
    placeholder: "john.doe@example.com",
  },
  {
    id: "country",
    label: "Country",
    placeholder: "E.g. The Netherlands",
  },
  {
    id: "city",
    label: "City",
    placeholder: "E.g. Amersfoort",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    placeholder: "+31612345678",
  },
];

const DealerForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      city: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    form.reset();

    if (data) {
      console.log(data);
      alert("form submitted");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        {isLoading && (
          <div className="flex flex-col gap-3 items-center justify-center w-full h-full absolute top-0 left-0 bg-slate-100/70">
            <Loader />
            <p className="text-sm">Sending your email...</p>
          </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-4">
            {formFields.slice(0, 2).map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow"
                        placeholder={item.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          {formFields.slice(2).map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={item.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow"
                      placeholder={item.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit form</Button>
        </form>
      </Form>
    </div>
  );
};

export default DealerForm;
