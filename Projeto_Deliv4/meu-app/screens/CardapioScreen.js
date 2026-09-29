import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import { useState } from 'react';

import ProdutoCard from '../components/produtosCard';

const produtos = [
  {
    id: 1,
    nome: 'X-Burger',
    descricao: 'Pão, carne, queijo e molho especial',
    preco: 24.90,
    imagem:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  },

  {
    id: 2,
    nome: 'X-Salada',
    descricao: 'Alface, tomate e queijo',
    preco: 27.90,
    imagem:
      'https://images.unsplash.com/photo-1550547660-d9450f859349',
  },

  {
    id: 3,
    nome: 'X-Bacon',
    descricao: 'Bacon, queijo e molho especial',
    preco: 29.90,
    imagem:
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b',
  },

  {
    id: 4,
    nome: 'Batata Frita',
    descricao: 'Porção de batatas crocantes',
    preco: 12.90,
    imagem:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
  },

  {
    id: 5,
    nome: 'Milk-shake',
    descricao: 'Milk-shake cremoso de chocolate',
    preco: 14.90,
    imagem:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699',
  },
];

export default function CardapioScreen({ onAdicionar }) {

  const [busca, setBusca] = useState('');

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.tela}>

      {/* Barra de pesquisa */}
      <View style={styles.areaBusca}>

        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar lanche..."
          placeholderTextColor="#9AA1AE"
          value={busca}
          onChangeText={setBusca}
        />

      </View>

      {/* Lista de produtos */}
      <ScrollView
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >

        {produtosFiltrados.map((produto) => (

          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAdicionar={onAdicionar}
          />

        ))}

        {produtosFiltrados.length === 0 && (
          <Text style={styles.semResultado}>
            Nenhum lanche encontrado.
          </Text>
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

  areaBusca: {
    paddingHorizontal: 8,
    paddingTop: 7,
    paddingBottom: 5,
  },

  inputBusca: {
    width: '100%',
    height: 30,

    backgroundColor: '#F2F4F7',

    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 5,

    paddingHorizontal: 8,

    fontSize: 11,
    color: '#202A44',
  },

  lista: {
    paddingHorizontal: 8,
    paddingTop: 2,
    paddingBottom: 15,
  },

  semResultado: {
    textAlign: 'center',
    marginTop: 25,

    fontSize: 14,
    color: '#464E5C',
  },

});