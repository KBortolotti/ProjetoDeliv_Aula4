import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ProdutoCard({ produto, onAdicionar }) {
  return (
    <View style={styles.card}>

      <Image
        source={{ uri: produto.imagem }}
        style={styles.imagem}
      />

      <View style={styles.informacoes}>

        <Text style={styles.nome} numberOfLines={1}>
          {produto.nome}
        </Text>

        <Text style={styles.descricao} numberOfLines={2}>
          {produto.descricao}
        </Text>

        <Text style={styles.preco}>
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => onAdicionar(produto)}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>+ Add</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 68,

    backgroundColor: '#F2F4F7',
    borderRadius: 8,

    marginBottom: 8,
    padding: 7,

    flexDirection: 'row',
    alignItems: 'center',
  },

  imagem: {
    width: 58,
    height: 58,
    borderRadius: 7,
  },

  informacoes: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 8,
  },

  nome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#202A44',
    marginBottom: 1,
  },

  descricao: {
    fontSize: 11,
    color: '#464E5C',
    marginBottom: 2,
  },

  preco: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EB5757',
  },

  /*
   * Botão propositalmente pequeno,
   * como no mockup.
   */
  botao: {
    height: 24,
    minWidth: 38,

    paddingHorizontal: 6,

    borderRadius: 12,

    backgroundColor: '#2EC478',

    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});