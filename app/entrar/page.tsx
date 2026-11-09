import { redirect } from 'next/navigation'
import { ENDERECO_PARA_ENTRAR } from '@/lib/servicoAutenticacao'

// A tela de login agora é a do Keycloak.
// Esta rota continua existindo para quem digitar ou guardar o endereço "/entrar".
export default function PaginaEntrar() {
  redirect(ENDERECO_PARA_ENTRAR)
}
