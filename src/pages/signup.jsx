import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/contexts/auth'

const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: 'O nome é obrigatório',
    }),

    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório',
    }),

    email: z
      .string()
      .trim()
      .min(1, {
        message: 'O e-mail é obrigatório',
      })
      .email({
        message: 'O e-mail é inválido',
      }),

    password: z.string().trim().min(6, {
      message: 'A senha deve ter no mínimo 6 caracteres',
    }),

    // CORRIGIDO
    passwordConfirmation: z.string().trim().min(1, {
      message: 'A confirmação de senha é obrigatória',
    }),

    terms: z.boolean().refine((value) => value === true, {
      message: 'Você precisa aceitar os termos',
    }),
  })

  // CORRIGIDO
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthContext()

  const methods = useForm({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  const handleSubmit = (data) => {
    signUp(data)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 p-4">
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="w-full max-w-[500px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Crie a sua conta</CardTitle>

            <CardDescription>Insira os seus dados abaixo.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* PRIMEIRO NOME */}
              <Controller
                control={methods.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nome</FieldLabel>

                    <FieldContent>
                      <Input
                        placeholder="Digite seu nome"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* ÚLTIMO NOME */}
              <Controller
                control={methods.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Sobrenome</FieldLabel>

                    <FieldContent>
                      <Input
                        placeholder="Digite seu sobrenome"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* E-MAIL */}
              <Controller
                control={methods.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>E-mail</FieldLabel>

                    <FieldContent>
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* SENHA */}
              <Controller
                control={methods.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Senha</FieldLabel>

                    <FieldContent>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* CONFIRMAÇÃO */}
              <Controller
                control={methods.control}
                name="passwordConfirmation"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirmação de senha</FieldLabel>

                    <FieldContent>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              {/* TERMOS */}
              <Controller
                control={methods.control}
                name="terms"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />

                      <div className="space-y-1 leading-none">
                        <FieldLabel
                          htmlFor="terms"
                          className="text-muted-foreground cursor-pointer text-xs opacity-75"
                        >
                          Ao clicar em “Criar conta”, você aceita nosso termo de
                          uso e política de privacidade.
                        </FieldLabel>

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </div>
                  </Field>
                )}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSigningUp}>
              {isSigningUp && 'Criando conta...'}

              {!isSigningUp && 'Criar conta'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>

        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignUpPage
