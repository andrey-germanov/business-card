import { Button, Stack, TextInput, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

type FormData = {
  email: string;
  password: string;
};
interface IFormProps {
  handleClick: (email: string, password: string) => void;
  error: string;
}
export const LoginForm = ({
  handleClick,
  error,
}: IFormProps) => {
  const form = useForm({
    validate: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(8, "Minimum 8 characters"),
      })
    ),
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = (data: FormData) => {
    const { email, password } = data;
    handleClick(email, password);
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Stack>
          <TextInput
            type="text"
            {...form.getInputProps("email")}
            placeholder="Email"
          />
          <TextInput
            type="password"
            {...form.getInputProps("password")}
            placeholder="Password"
          />
          <Button type={"submit"} disabled={!!error.length}>
            Sign in
          </Button>
        </Stack>
      </form>
      <Text>{error}</Text>
    </Stack>
  );
};
