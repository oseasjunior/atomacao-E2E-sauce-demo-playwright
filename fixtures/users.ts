export const USUARIOS = {
  valido: {
    usuario: 'standard_user',
    senha: 'secret_sauce'
  },
  bloqueado: {
    usuario: 'locked_out_user',
    senha: 'secret_sauce',
  },
  invalido: {
    usuario: 'usuario_invalido',
    senha: 'senha_errada',
  },
}
export const BACKPACK = {
  titulo: 'Sauce Labs Backpack',
  preco: '$29.99'
} as const;
