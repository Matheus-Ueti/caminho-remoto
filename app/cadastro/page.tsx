import { redirect } from 'next/navigation'
import { ENDERECO_PARA_CADASTRAR } from '@/lib/servicoAutenticacao'

// A tela de criar conta agora é a do Keycloak.
// Esta rota continua existindo para os links "/cadastro" do site seguirem funcionando.
export default function PaginaCadastro() {
  redirect(ENDERECO_PARA_CADASTRAR)
}
