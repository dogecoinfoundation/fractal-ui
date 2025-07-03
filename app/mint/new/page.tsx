"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";
import type { Mint } from "@/app/api/mints/route";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
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

const FormSchema = z.object({
  title: z.string().nonempty({
    message: "Please provide a name of the asset you wish to mint.",
  }),
  description: z.string().nonempty({
    message: "Please provide a description of the asset you wish to mint.",
  }),
  fraction_count: z.coerce
    .number()
    .nonnegative({ message: "Please provide a positive number of tokens." })
    .min(1, {
      message: "Please ensure the number of tokens is at least 1.",
    }),
});

const fetcher = (url: string): Promise<Mint[]> =>
  fetch(url).then((res) => res.json());

export default function MintNewAsset() {
  const { mutate } = useSWR("/api/mints", fetcher);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      fraction_count: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await fetch("/api/mints", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          fraction_count: data.fraction_count,
          metadata: {
            type: "test",
            category: "sample",
          },
          feed_url: "https://example.com",
          tags: ["test"],
        }),
      });
      await mutate();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header label="Mint an Asset" />
      <Separator />
      <div className="overflow-y-auto flex flex-col flex-1 justify-start items-start bg-gray-100 border-1 border-gray-300 rounded-sm p-4">
        <Form {...form}>
          <form
            className="min-w-xl h-xl flex-0 bg-white/80 border-zinc-300 border-1 rounded-sm p-4 gap-4 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Asset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Asset Description</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fraction_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="fraction_count">Tokens</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="emerald" className="cursor-pointer">
              Mint
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
