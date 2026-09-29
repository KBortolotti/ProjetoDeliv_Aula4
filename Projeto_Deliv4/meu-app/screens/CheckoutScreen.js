import {
  ScrollView,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function CheckoutScreen({ carrinho, onFinalizar }) {

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');

  const [pagamento, setPagamento] = useState('');
  const [precisaTroco, setPrecisaTroco] = useState(false);
  const [troco, setTroco] = useState('');

  const [erros, setErros] = useState({});


  function limparErro(campo) {
    setErros((errosAtuais) => {
      const novosErros = { ...errosAtuais };

      delete novosErros[campo];

      return novosErros;
    });
  }


  function finalizarPedido() {

    const novosErros = {};

    // Nome
    if (nome.trim() === '') {
      novosErros.nome = 'Nome é obrigatório.';
    }


    // Telefone
    const telefoneNumeros = telefone.replace(/\D/g, '');

    if (telefone.trim() === '') {
      novosErros.telefone = 'Telefone é obrigatório.';
    } else if (
      telefoneNumeros.length < 10 ||
      telefoneNumeros.length > 11
    ) {
      novosErros.telefone = 'Informe um telefone válido.';
    }


    // CEP
    if (cep.trim() === '') {
      novosErros.cep = 'CEP é obrigatório.';
    } else if (!/^\d+$/.test(cep)) {
      novosErros.cep = 'CEP deve conter apenas números.';
    } else if (cep.length !== 8) {
      novosErros.cep = 'CEP deve ter 8 dígitos.';
    }


    // Endereço
    if (endereco.trim() === '') {
      novosErros.endereco = 'Endereço é obrigatório.';
    }


    // Número
    if (numero.trim() === '') {
      novosErros.numero = 'Número é obrigatório.';
    } else if (!/^\d+$/.test(numero)) {
      novosErros.numero = 'Número deve conter apenas números.';
    }


    // Pagamento
    if (pagamento === '') {
      novosErros.pagamento = 'Selecione uma forma de pagamento.';
    }


    // Troco
    if (
      pagamento === 'Dinheiro' &&
      precisaTroco
    ) {

      if (troco.trim() === '') {
        novosErros.troco = 'Informe o valor do troco.';
      } else if (!/^\d+([.,]\d{1,2})?$/.test(troco)) {
        novosErros.troco = 'Informe um valor válido.';
      }

    }


    setErros(novosErros);


    // Se existir algum erro, não finaliza.
    if (Object.keys(novosErros).length > 0) {
      return;
    }


    // Todos os dados estão corretos.
    onFinalizar({
      nome,
      telefone,
      cep,
      endereco,
      numero,
      complemento,
      referencia,
      pagamento,
      precisaTroco,
      troco,
    });
  }


  function escolherPagamento(forma) {

    setPagamento(forma);

    limparErro('pagamento');

    if (forma !== 'Dinheiro') {
      setPrecisaTroco(false);
      setTroco('');
      limparErro('troco');
    }
  }


  return (
    <View style={styles.tela}>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* NOME */}

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={[
            styles.input,
            erros.nome && styles.inputErro,
          ]}
          placeholder="Maria Silva"
          placeholderTextColor="#9AA1AE"
          value={nome}
          onChangeText={(texto) => {
            setNome(texto);
            limparErro('nome');
          }}
          keyboardType="default"
        />

        {erros.nome && (
          <View style={styles.mensagemErro}>
            <Text style={styles.simboloErro}>⚠</Text>
            <Text style={styles.textoErro}>
              {erros.nome}
            </Text>
          </View>
        )}


        {/* TELEFONE */}

        <Text style={styles.label}>
          Telefone
        </Text>

        <TextInput
          style={[
            styles.input,
            erros.telefone && styles.inputErro,
          ]}
          placeholder="(19) 99999-9999"
          placeholderTextColor="#9AA1AE"
          value={telefone}
          onChangeText={(texto) => {
            setTelefone(texto);
            limparErro('telefone');
          }}
          keyboardType="phone-pad"
        />

        {erros.telefone && (
          <View style={styles.mensagemErro}>
            <Text style={styles.simboloErro}>⚠</Text>
            <Text style={styles.textoErro}>
              {erros.telefone}
            </Text>
          </View>
        )}


        {/* CEP */}

        <Text style={styles.label}>
          CEP
        </Text>

        <TextInput
          style={[
            styles.input,
            erros.cep && styles.inputErro,
          ]}
          placeholder="Somente números"
          placeholderTextColor="#9AA1AE"
          value={cep}
          onChangeText={(texto) => {
            setCep(texto);
            limparErro('cep');
          }}
          keyboardType="numeric"
          maxLength={8}
        />

        {erros.cep && (
          <View style={styles.mensagemErro}>
            <Text style={styles.simboloErro}>⚠</Text>
            <Text style={styles.textoErro}>
              {erros.cep}
            </Text>
          </View>
        )}


        {/* ENDEREÇO */}

        <Text style={styles.label}>
          Endereço
        </Text>

        <TextInput
          style={[
            styles.input,
            erros.endereco && styles.inputErro,
          ]}
          placeholder="Rua, avenida..."
          placeholderTextColor="#9AA1AE"
          value={endereco}
          onChangeText={(texto) => {
            setEndereco(texto);
            limparErro('endereco');
          }}
          keyboardType="default"
        />

        {erros.endereco && (
          <View style={styles.mensagemErro}>
            <Text style={styles.simboloErro}>⚠</Text>
            <Text style={styles.textoErro}>
              {erros.endereco}
            </Text>
          </View>
        )}


        {/* NÚMERO */}

        <Text style={styles.label}>
          Número
        </Text>

        <TextInput
          style={[
            styles.input,
            erros.numero && styles.inputErro,
          ]}
          placeholder="123"
          placeholderTextColor="#9AA1AE"
          value={numero}
          onChangeText={(texto) => {
            setNumero(texto);
            limparErro('numero');
          }}
          keyboardType="numeric"
        />

        {erros.numero && (
          <View style={styles.mensagemErro}>
            <Text style={styles.simboloErro}>⚠</Text>
            <Text style={styles.textoErro}>
              {erros.numero}
            </Text>
          </View>
        )}


        {/* COMPLEMENTO */}

        <Text style={styles.label}>
          Complemento (opcional)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Apto, bloco..."
          placeholderTextColor="#9AA1AE"
          value={complemento}
          onChangeText={setComplemento}
          keyboardType="default"
        />


        {/* REFERÊNCIA */}

        <Text style={styles.label}>
          Referência
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Próximo a..."
          placeholderTextColor="#9AA1AE"
          value={referencia}
          onChangeText={setReferencia}
          keyboardType="default"
        />


        {/* PAGAMENTO */}

        <Text style={styles.label}>
          Pagamento
        </Text>

        <View
          style={[
            styles.caixaPagamento,
            erros.pagamento && styles.inputErro,
          ]}
        >

          <Picker
            selectedValue={pagamento}
            onValueChange={escolherPagamento}
            style={styles.picker}
          >

            <Picker.Item
              label="Selecione..."
              value=""
            />

            <Picker.Item
              label="Cartão"
              value="Cartão"
            />

            <Picker.Item
              label="Pix"
              value="Pix"
            />

            <Picker.Item
              label="Dinheiro"
              value="Dinheiro"
            />

          </Picker>

        </View>

        {erros.pagamento && (
          <View style={styles.mensagemErro}>
            <Text style={styles.simboloErro}>⚠</Text>
            <Text style={styles.textoErro}>
              {erros.pagamento}
            </Text>
          </View>
        )}


        {/* TROCO */}

        {pagamento === 'Dinheiro' && (

          <View>

            <View style={styles.linhaSwitch}>

              <Text style={styles.textoSwitch}>
                Preciso de troco
              </Text>

              <Switch
                value={precisaTroco}
                onValueChange={(valor) => {
                  setPrecisaTroco(valor);

                  if (!valor) {
                    setTroco('');
                    limparErro('troco');
                  }
                }}
                trackColor={{
                  false: '#D9DDE5',
                  true: '#2EC478',
                }}
                thumbColor="#FFFFFF"
              />

            </View>


            {precisaTroco && (

              <>
                <Text style={styles.label}>
                  Troco para:
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    erros.troco && styles.inputErro,
                  ]}
                  placeholder="Ex.: 50"
                  placeholderTextColor="#9AA1AE"
                  value={troco}
                  onChangeText={(texto) => {
                    setTroco(texto);
                    limparErro('troco');
                  }}
                  keyboardType="numeric"
                />

                {erros.troco && (
                  <View style={styles.mensagemErro}>
                    <Text style={styles.simboloErro}>⚠</Text>
                    <Text style={styles.textoErro}>
                      {erros.troco}
                    </Text>
                  </View>
                )}

              </>

            )}

          </View>

        )}


        {/* FINALIZAR */}

        <TouchableOpacity
          style={styles.botaoFinalizar}
          onPress={finalizarPedido}
          activeOpacity={0.7}
        >

          <Text style={styles.textoFinalizar}>
            Finalizar pedido
          </Text>

        </TouchableOpacity>

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
    padding: 12,
    paddingBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#202A44',

    marginTop: 10,
    marginBottom: 4,
  },

  input: {
    width: '100%',
    minHeight: 42,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 12,

    paddingHorizontal: 10,

    fontSize: 14,
    color: '#202A44',
  },

  inputErro: {
    backgroundColor: '#FFF1F1',
    borderColor: '#EB5757',
  },

  mensagemErro: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 4,
    paddingHorizontal: 2,
  },

  simboloErro: {
    fontSize: 13,
    color: '#EB5757',
    marginRight: 5,
  },

  textoErro: {
    flex: 1,

    fontSize: 12,
    color: '#EB5757',
  },

  caixaPagamento: {
    width: '100%',
    height: 42,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 12,

    overflow: 'hidden',
  },

  picker: {
    width: '100%',
    height: 42,
    color: '#202A44',
  },

  linhaSwitch: {
    minHeight: 44,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: 10,
  },

  textoSwitch: {
    fontSize: 14,
    color: '#202A44',
  },

  botaoFinalizar: {
    width: '100%',
    minHeight: 46,

    marginTop: 24,

    borderRadius: 12,
    backgroundColor: '#3D5AFE',

    alignItems: 'center',
    justifyContent: 'center',
  },

  textoFinalizar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});