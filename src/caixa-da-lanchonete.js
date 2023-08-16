class CaixaDaLanchonete {
  cardapio = {
    cafe: { descricao: 'Café', valor: 3.0 },
    chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
    suco: { descricao: 'Suco Natural', valor: 6.2 },
    sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
    queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
    salgado: { descricao: 'Salgado', valor: 7.25 },
    combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
    combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
  };

  calcularValorDaCompra(formaDePagamento, itens) {
    const validFormasDePagamento = ['debito', 'dinheiro', 'credito'];

    if (!validFormasDePagamento.includes(formaDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    let valorTotal = 0;
    let itemsMap = {};

    itens.forEach(item => {
      const [codigo, quantidade] = item.split(',');
      console.log(codigo in this.cardapio)
      console.log((codigo in this.cardapio) === false)

      if (!itemsMap[codigo]) {
        itemsMap[codigo] = 0;
      }
      itemsMap[codigo] += parseInt(quantidade);
    });

    for (const codigo in itemsMap) {
      const item = this.cardapio[codigo];
      const quantidade = itemsMap[codigo];

      if (codigo in this.cardapio === false) {
        return 'Item inválido!';
      }

      if (codigo === 'chantily' && !itemsMap['cafe']) {
        return 'Item extra não pode ser pedido sem o principal';
      }
      if (codigo === 'queijo' && !itemsMap['sanduiche']) {
        return 'Item extra não pode ser pedido sem o principal';
      }

    if (quantidade === 0) {
      return 'Quantidade inválida!';
    }

      valorTotal += item.valor * quantidade;
    }
    
    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95;
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03; 
    }

    if (valorTotal === 0) {
      return 'Não há itens no carrinho de compra!';
    }
    const valorFormatado = valorTotal.toFixed(2).replace('.', ',');
    return `R$ ${valorFormatado}`;
  }
}
// Exemplos de uso
const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra('debito', ['pizza, 1'])); // "R$ 
console.log(caixa.calcularValorDaCompra('debito', ['cafe, 1'])); // "R$ 
console.log(caixa.calcularValorDaCompra('credito', ['1'])); // "R$ 

export { CaixaDaLanchonete };