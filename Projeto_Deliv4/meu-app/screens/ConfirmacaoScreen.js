import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ConfirmacaoScreen({
  carrinho,
  dados,
  numeroPedido,
  onNovoPedido,
}) {

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const taxaEntrega = 6.00;

  const total = subtotal + taxaEntrega;

  return (
    <View style={styles.tela}>

      <View style={styles.moldura}>

        <ScrollView
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >

          {/* Parte superior */}

          <View style={styles.topo}>

            <View style={styles.circuloSucesso}>
              <Text style={styles.check}>
                ✓
              </Text>
            </View>

            <Text style={styles.titulo}>
              Pedido confirmado!
            </Text>

            <Text style={styles.numeroPedido}>
              Pedido #{numeroPedido}
            </Text>

          </View>


          {/* Produtos */}

          <View style={styles.produtos}>

            {carrinho.map((item) => (

              <View
                key={item.id}
                style={styles.linhaProduto}
              >

                <Text style={styles.produto}>
                  {item.quantidade}x {item.nome}
                </Text>

              </View>

            ))}

          </View>


          {/* Total e entrega */}

          <View style={styles.informacoes}>

            <View style={styles.linhaTotal}>

              <Text style={styles.totalLabel}>
                Total pago
              </Text>

              <Text style={styles.totalValor}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>

            </View>

            <Text style={styles.detalhe}>
              Entrega: {dados.endereco}, {dados.numero}
            </Text>

            <Text style={styles.detalhe}>
              Pagamento: {dados.pagamento}
            </Text>

          </View>


          {/* Rodapé */}

          <View style={styles.rodape}>

            <TouchableOpacity
              style={styles.botaoNovoPedido}
              onPress={onNovoPedido}
              activeOpacity={0.7}
            >
              <Text style={styles.textoBotao}>
                Fazer novo pedido
              </Text>
            </TouchableOpacity>

            <Text style={styles.identificacao}>
              T4 · Confirmação
            </Text>

          </View>

        </ScrollView>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  tela: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  moldura: {
    flex: 1,

    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  conteudo: {
    flexGrow: 1,

    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 8,
  },

  topo: {
    alignItems: 'center',
  },

  circuloSucesso: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: '#2EC478',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 8,
  },

  check: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 38,
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#202A44',

    textAlign: 'center',
  },

  numeroPedido: {
    marginTop: 3,

    fontSize: 14,
    fontWeight: 'bold',

    color: '#7B8CFF',

    textAlign: 'center',
  },

  produtos: {
    width: '100%',

    marginTop: 24,

    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',

    paddingVertical: 6,
  },

  linhaProduto: {
    minHeight: 25,

    justifyContent: 'center',
  },

  produto: {
    fontSize: 12,

    color: '#464E5C',
  },

  informacoes: {
    width: '100%',

    marginTop: 10,
  },

  linhaTotal: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 5,
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',

    color: '#202A44',
  },

  totalValor: {
    fontSize: 14,
    fontWeight: 'bold',

    color: '#2EC478',
  },

  detalhe: {
    fontSize: 11,

    color: '#464E5C',

    marginTop: 2,
  },

  rodape: {
    width: '100%',

    alignItems: 'center',

    marginTop: 'auto',
    paddingTop: 20,
  },

  botaoNovoPedido: {
    width: '100%',
    minHeight: 42,

    borderRadius: 9,

    backgroundColor: '#2EC478',

    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    fontSize: 13,
    fontWeight: 'bold',

    color: '#FFFFFF',
  },

  identificacao: {
    marginTop: 3,

    fontSize: 12,
    fontWeight: 'bold',

    color: '#2EC478',

    textAlign: 'center',
  },

});