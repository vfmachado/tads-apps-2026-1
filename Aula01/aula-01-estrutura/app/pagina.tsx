import Botao from "@/components/botao";
import Texto from "@/components/texto";
import React, { useState } from "react";
import { View } from "react-native";

export default function Pagina() {

    const [count, setCount] = useState(0);

    const addCount = () => {
        setCount(count + 1);
    }

    const reduceCount = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    return ( 
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* children do componente texto */}
            <Texto>TEXTO POR CHILDREN</Texto>
            <Texto text="TEXTO POR PROP" />

            <Botao title="CLICA AQUI" onPress={() => console.log("CLIQUEI")}/>
            
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '60%',
                marginTop: 20
            }}>
                <Botao title="Reduzir" onPress={reduceCount} />
                <Texto>{count}</Texto>
                <Botao title="Adicionar" onPress={addCount} />
                
            </View>
            {/* <TextInput style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                width: '80%',
                marginTop: 20,
                paddingHorizontal: 10
            }} /> */}

        </View>
    )
}
