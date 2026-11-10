import { estilos as estilosDoCampo } from '@/components/ui/Campo'

type Opcao = {
  valor: string
  texto: string
}

type CampoDeEscolhaProps = {
  id: string
  rotulo: string
  opcoes: Opcao[]
}

/** Lista de opções com rótulo, no mesmo visual do `Campo`. */
export function CampoDeEscolha({ id, rotulo, opcoes }: CampoDeEscolhaProps) {
  return (
    <div style={estilosDoCampo.grupo}>
      <label htmlFor={id} style={estilosDoCampo.rotulo}>
        {rotulo}
      </label>
      <select id={id} name={id} required style={estilosDoCampo.campo}>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}
      </select>
    </div>
  )
}
