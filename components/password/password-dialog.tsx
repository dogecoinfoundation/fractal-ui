import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/forms/input-form-field";
import { Paper } from "@/components/ui/surfaces/Paper";
import { AuthContext } from "@/context/auth-context";

const PasswordDialogSchema = z.object({
  password: z.string().min(1),
});

export const PasswordDialog = () => {
  const { setPassword } = useContext(AuthContext);

  const form = useForm<z.infer<typeof PasswordDialogSchema>>({
    resolver: zodResolver(PasswordDialogSchema),
    defaultValues: {
      password: "abc123",
    },
  });

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => setPassword(data.password))}
        >
          <Paper className="min-w-md p-4 gap-4">
            <div className="flex flex-row justify-between items-center gap-2">
              <h1 className="leading-tight">Fractal Administration - Login</h1>
              <Lock className="size-4 text-zinc-400" />
            </div>
            <InputFormField
              required
              key="password"
              control={form.control}
              name="password"
              label="Password"
              inputType="password"
            />
            <Button
              type="submit"
              variant="creative"
              className="cursor-pointer"
              disabled={!form.formState.isValid}
            >
              Login
            </Button>
          </Paper>
        </form>
      </Form>
    </div>
  );
};
