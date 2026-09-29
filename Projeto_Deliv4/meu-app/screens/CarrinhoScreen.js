import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CarrinhoScreen({
  carrinho,
  onAumentar,
  onDiminuir,
  onVoltar,
  onContinuar,
}) {

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const taxaEntrega = 6.00;

  const total = subtotal + taxaEntrega;

  return (
    <View style={styles.tela}>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >

        {carrinho.length === 0 ? (

          <View style={styles.vazio}>

            <Text style={styles.textoVazio}>
              Seu carrinho está vazio.
            </Text>

            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={onVoltar}
            >
              <Text style={styles.textoBotao}>
                Voltar ao Cardápio
              </Text>
            </TouchableOpacity>

          </View>

        ) : (

          <>

            {/* Produtos */}
            <View style={styles.lista}>

              {carrinho.map((item) => (

                <View
                  key={item.id}
                  style={styles.item}
                >

                  <View style={styles.informacoes}>

                    <Text
                      style={styles.nome}
                      numberOfLines={1}
                    >
                      {item.nome}
                    </Text>

                    <Text style={styles.preco}>
                      R$ {item.preco.toFixed(2).replace('.', ',')}
                    </Text>

                  </View>

                  {/* Quantidade e total */}
                  <View style={styles.ladoDireito}>

                    <View style={styles.controles}>

                      <TouchableOpacity
                        style={styles.botaoQuantidade}
                        onPress={() => onDiminuir(item.id)}
                      >
                        <Text style={styles.simbolo}>
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.quantidade}>
                        {item.quantidade}
                      </Text>

                      <TouchableOpacity
                        style={styles.botaoQuantidade}
                        onPress={() => onAumentar(item.id)}
                      >
                        <Text style={styles.simbolo}>
                          +
                        </Text>
                      </TouchableOpacity>

                    </View>

                    {/* Total do produto abaixo dos controles */}
                    <Text style={styles.totalItem}>
                      R$ {(item.preco * item.quantidade)
                        .toFixed(2)
                        .replace('.', ',')}
                    </Text>

                  </View>

                </View>

              ))}

            </View>

            {/* Espaço flexível para empurrar o resumo para o final */}
            <View style={styles.espaco} />

            {/* Resumo + botão */}
            <View style={styles.rodape}>

              {/* Resumo */}
              <View style={styles.resumo}>

                <View style={styles.linha}>
                  <Text style={styles.label}>
                    Subtotal
                  </Text>

                  <Text style={styles.valor}>
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </Text>
                </View>

                <View style={styles.linha}>
                  <Text style={styles.label}>
                    Entrega
                  </Text>

                  <Text style={styles.valor}>
                    R$ {taxaEntrega.toFixed(2).replace('.', ',')}
                  </Text>
                </View>

                <View style={styles.linhaTotal}>

                  <Text style={styles.totalLabel}>
                    TOTAL
                  </Text>

                  <Text style={styles.totalValor}>
                    R$ {total.toFixed(2).replace('.', ',')}
                  </Text>

                </View>

              </View>

              {/* Continuar */}
              <TouchableOpacity
                style={styles.botaoContinuar}
                onPress={onContinuar}
              >
                <Text style={styles.textoContinuar}>
                  Continuar
                </Text>
              </TouchableOpacity>

            </View>

          </>

        )}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  tela: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  conteudo: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 20,
  },

  lista: {
    width: '100%',
  },

  item: {
    width: '100%',
    minHeight: 65,

    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 8,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  informacoes: {
    flex: 1,
    minWidth: 0,
  },

  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#202A44',
    marginBottom: 2,
  },

  preco: {
    fontSize: 12,
    color: '#464E5C',
  },

  /* Área dos botões e preço */
  ladoDireito: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },

  controles: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Botões menores, fundo quase transparente e somente borda azul */
  botaoQuantidade: {
    width: 28,
    height: 28,

    borderRadius: 6,

    backgroundColor: '#F4F6FF',

    borderWidth: 1,
    borderColor: '#3D5AFE',

    alignItems: 'center',
    justifyContent: 'center',
  },

  simbolo: {
    color: '#3D5AFE',
    fontSize: 17,
    fontWeight: 'bold',
  },

  quantidade: {
    minWidth: 22,

    textAlign: 'center',

    fontSize: 14,
    fontWeight: 'bold',
    color: '#202A44',
  },

  /* Preço abaixo dos botões */
  totalItem: {
    marginTop: 4,

    fontSize: 12,
    fontWeight: 'bold',
    color: '#202A44',
  },

  /* Empurra o resumo para o final da tela */
  espaco: {
    flex: 1,
  },

  rodape: {
    width: '100%',
  },

  resumo: {
    width: '100%',

    padding: 14,

    backgroundColor: '#F2F4F7',
    borderRadius: 10,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: '#464E5C',
  },

  valor: {
    fontSize: 14,
    color: '#202A44',
  },

  linhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 3,
    paddingTop: 10,

    borderTopWidth: 1,
    borderTopColor: '#D9DDE5',
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202A44',
  },

  totalValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2EC478',
  },

 botaoContinuar: {
  width: '100%',
  minHeight: 46,

  marginTop: 18,

  borderRadius: 12,
  backgroundColor: '#3D5AFE',

  alignItems: 'center',
  justifyContent: 'center',
  },

  textoContinuar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 60,
  },

  textoVazio: {
    fontSize: 16,
    color: '#464E5C',
    marginBottom: 18,
  },

  botaoVoltar: {
    minHeight: 44,
    paddingHorizontal: 20,

    borderRadius: 8,
    backgroundColor: '#2EC478',

    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

});