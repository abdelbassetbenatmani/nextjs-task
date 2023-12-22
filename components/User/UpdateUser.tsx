"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { addUser, updateSpecificUser } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { formSchema } from "@/lib/validation/validationSchema";
import Loader from "../Loader/Loader";
interface UpdateUserProps {
  sectors: { id: string; name: string }[] | null;
  user: {
    id: string;
    name: string;
    agree: boolean;
    sector: { id: string; name: string };
  } | null;
}

const UpdateUser = ({ sectors, user }: UpdateUserProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [allSectors, setAllSectors] = useState(sectors);
  const [userData, setUserData] = useState(user);

  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name,
      sector: userData?.sector.id,
      agree: userData?.agree,
    },
  });
  const isLoading = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.sector === "") {
      // Validate Sector selectd
      toast({
        title: "Please select a sector",
        description: "Please select a sector before submitting",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await updateSpecificUser(userData?.id as string, {
        name: values.name,
        sectorId: values.sector,
        agree: values.agree,
      });
      toast({
        title: "User Update successfully",
        description: "User Updated successfully",
      });
      // Redirect to user page information
      router.push(`/users/${response.data?.id}`);
    } catch (error) {
      toast({
        title: "User updated field",
        description: "User updated field",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="px-4">
      <Form {...form}>
        <FormDescription className="text-center mb-3">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </FormDescription>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sectors</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value
                            ? allSectors?.find((sec) => sec.id === field.value)
                                ?.name
                            : "Select sector..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search sector..." />
                        <CommandEmpty>No sector found.</CommandEmpty>
                        <CommandGroup className="h-[350px] overflow-scroll">
                          {allSectors?.map((sec) => (
                            <CommandItem
                              value={sec.name}
                              key={sec.id}
                              onSelect={() => {
                                form.setValue("sector", sec.id);
                              }}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  sec.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {sec.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          }

          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Agree to terms</FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">{!isLoading ? <span>Update</span> : <Loader />}</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUser;
