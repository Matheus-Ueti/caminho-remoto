'use client' // Precisa perguntar à API, no navegador, quem está logado.

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Icone } from '@/components/ui/Icone'
import {
  ENDERECO_PARA_CADASTRAR,
  ENDERECO_PARA_ENTRAR,
  ENDERECO_PARA_SAIR,
  buscarUsuarioLogado,
} from '@/lib/servicoAutenticacao'
import { cores, espaco, fonte } from '@/lib/tema'
import type { UsuarioLogado } from '@/types'

export function MenuDoUsuario() {
  const caminhoAtual = usePathname()
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)
  const [estaCarregando, setEstaCarregando] = useState(true)

  // O cabeçalho não é recriado ao trocar de página, então perguntamos de novo a cada página.
  useEffect(() => {
    buscarUsuarioLogado().then((usuarioEncontrado) => {
      setUsuario(usuarioEncontrado)
      setEstaCarregando(false)
    })
  }, [caminhoAtual])

  // Enquanto não sabemos, não mostramos nada, para não piscar "Entrar" para quem já está logado.
  if (estaCarregando) return <div style={estilos.espacoReservado} />

  if (!usuario) {
    return (
      <div style={estilos.menu}>
        <a href={ENDERECO_PARA_ENTRAR} style={estilos.link}>
          <Icone nome="usuario" tamanho={18} />
          Entrar
        </a>
        <BotaoLink href={ENDERECO_PARA_CADASTRAR}>Cadastrar</BotaoLink>
      </div>
    )
  }

  const primeiroNome = usuario.nome.split(' ')[0]

  return (
    <div style={estilos.menu}>
      <Link href="/aluno" style={estilos.link}>
        <Icone nome="usuario" tamanho={18} />
        Olá, {primeiroNome}
      </Link>
      <BotaoLink href={ENDERECO_PARA_SAIR} variante="contorno">
        Sair
      </BotaoLink>
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  menu: { display: 'flex', alignItems: 'center', gap: espaco.lg },
  espacoReservado: { height: 40 },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: fonte.tamanho.md,
    fontWeight: fonte.peso.medio,
    color: cores.texto,
    textDecoration: 'none',
  },
} satisfies Record<string, CSSProperties>
