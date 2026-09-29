import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import CardapioScreen from './screens/CardapioScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfirmacaoScreen from './screens/ConfirmacaoScreen';

export default function App() {

  const [carrinho, setCarrinho] = useState([]);

  const [tela, setTela] = useState('cardapio');

  const [dadosPedido, setDadosPedido] = useState(null);

  const [numeroPedido, setNumeroPedido] = useState(null);


  // Adiciona produto ao carrinho.
  // Se o produto já existir, aumenta a quantidade.
  function adicionarAoCarrinho(produto) {

    setCarrinho((carrinhoAtual) => {

      const itemExistente = carrinhoAtual.find(
        (item) => item.id === produto.id
      );

      if (itemExistente) {

        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );

      }

      return [
        ...carrinhoAtual,
        {
          ...produto,
          quantidade: 1,
        },
      ];

    });
  }


  // Aumenta a quantidade de um produto.
  function aumentarQuantidade(id) {

    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    );
  }


  // Diminui a quantidade.
  // Quando chegar a zero, o item é removido.
  function diminuirQuantidade(id) {

    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }


  // Finaliza o checkout e abre a tela de confirmação.
  function finalizarPedido(dados) {

    setDadosPedido(dados);

    const numero = Math.floor(
      100000 + Math.random() * 900000
    );

    setNumeroPedido(numero);

    setTela('confirmacao');
  }


  // Começa um novo pedido.
  function novoPedido() {

    setCarrinho([]);

    setDadosPedido(null);

    setNumeroPedido(null);

    setTela('cardapio');
  }


  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );


  return (
    <View style={styles.container}>

      {/* Cabeçalho */}

      <View style={styles.cabecalho}>

        {tela === 'cardapio' && (

          <>
            <Text style={styles.titulo}>
              DelivExpress
            </Text>

            <TouchableOpacity
              onPress={() => setTela('carrinho')}
              style={styles.botaoCarrinho}
              activeOpacity={0.7}
            >

              <View style={styles.badgeCarrinho}>

                <Text style={styles.numeroCarrinho}>
                  {quantidadeTotal}
                </Text>

              </View>

            </TouchableOpacity>
          </>

        )}


        {tela === 'carrinho' && (

          <>
            <TouchableOpacity
              onPress={() => setTela('cardapio')}
              style={styles.botaoVoltar}
              activeOpacity={0.7}
            >

              <Text style={styles.seta}>
                ←
              </Text>

            </TouchableOpacity>

            <Text style={styles.titulo}>
              Meu Carrinho
            </Text>

            <View style={styles.espacoDireita} />
          </>

        )}


        {tela === 'checkout' && (

          <>
            <TouchableOpacity
              onPress={() => setTela('carrinho')}
              style={styles.botaoVoltar}
              activeOpacity={0.7}
            >

              <Text style={styles.seta}>
                ←
              </Text>

            </TouchableOpacity>

            <Text style={styles.titulo}>
              Dados de Entrega
            </Text>

            <View style={styles.espacoDireita} />
          </>

        )}


        {tela === 'confirmacao' && (

          <>
            <Text style={styles.titulo}>
              Pedido Confirmado
            </Text>

            <View style={styles.espacoDireita} />
          </>

        )}

      </View>


      {/* Tela do Cardápio */}

      {tela === 'cardapio' && (

        <CardapioScreen
          onAdicionar={adicionarAoCarrinho}
        />

      )}


      {/* Tela do Carrinho */}

      {tela === 'carrinho' && (

        <CarrinhoScreen
          carrinho={carrinho}
          onAumentar={aumentarQuantidade}
          onDiminuir={diminuirQuantidade}
          onVoltar={() => setTela('cardapio')}
          onContinuar={() => setTela('checkout')}
        />

      )}


      {/* Tela de Checkout */}

      {tela === 'checkout' && (

        <CheckoutScreen
          carrinho={carrinho}
          onFinalizar={finalizarPedido}
        />

      )}


      {/* Tela de Confirmação */}

      {tela === 'confirmacao' && (

        <ConfirmacaoScreen
          carrinho={carrinho}
          dados={dadosPedido}
          numeroPedido={numeroPedido}
          onNovoPedido={novoPedido}
        />

      )}

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  cabecalho: {
    height: 48,
    backgroundColor: '#3D5AFE',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
  },

  titulo: {
    flex: 1,

    fontSize: 16,
    fontWeight: 'bold',

    color: '#FFFFFF',
  },

  botaoCarrinho: {
    width: 40,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeCarrinho: {
    width: 20,
    height: 20,

    borderRadius: 10,

    backgroundColor: '#2EC478',

    alignItems: 'center',
    justifyContent: 'center',
  },

  numeroCarrinho: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    width: 40,
    height: 40,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  seta: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  espacoDireita: {
    width: 40,
  },

});