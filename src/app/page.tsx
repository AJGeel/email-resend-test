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

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  country: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
});

const DealerForm = () => {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const formFields: {
    id: "firstName" | "lastName" | "email" | "country" | "city" | "phoneNumber";
    label: string;
    placeholder: string;
  }[] = [
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-4">
          {formFields.slice(0, 2).map((item) => {
            return (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={item.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
        {formFields.slice(2).map((item) => {
          return (
            <FormField
              key={item.id}
              control={form.control}
              name={item.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={item.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit">Submit form</Button>
      </form>
    </Form>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full lg:max-w-2xl p-24 ">
        <DealerForm />
      </div>
    </main>
  );
}
