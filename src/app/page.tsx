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
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      country: "The Netherlands",
      city: "Amersfoort",
      phoneNumber: "0640018293",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log(data);
    if (data) {
      alert("form submitted");
    }
  };

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
          );
        })}
        <Button type="submit">Submit form</Button>
      </form>
    </Form>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="w-full lg:max-w-2xl p-24 ">
        <DealerForm />
      </div>
    </main>
  );
}
