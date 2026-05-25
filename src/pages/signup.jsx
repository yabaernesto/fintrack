import { Link } from 'react-router'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Insira os seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Digite seu nome" />
            <Input placeholder="Digite seu sobrenome" />
            <Input type="email" placeholder="Digite seu e-mail" />
            <PasswordInput />
            <PasswordInput placeholder="Digite sua senha novamente" />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-muted-foreground text-xs opacity-75"
              >
                Ao clicar em "criar conta", voce aceita nosso termo de uso e
                politica de privacidade.
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-green-700 hover:bg-green-600">
            Criar conta
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ja possui uma conta ?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faca login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignUpPage
