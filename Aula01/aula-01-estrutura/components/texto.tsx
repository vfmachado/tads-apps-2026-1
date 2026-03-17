import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

type TextProps = PropsWithChildren<{
    text?: string;
}>

export default function Texto({text, children}: TextProps) {
    
    if (text) {
    return ( 
       <View>
           {/* <Text style={{fontSize: 24}}>Texto do componente</Text> */}
            <Text style={{fontSize: 24}}>{text}</Text>
       </View>
    )
    }

    return (
        <View>
            {/* <Text style={{fontSize: 24}}>Texto do componente</Text> */}
             <Text style={{fontSize: 24}}>{children}</Text>
        </View>
     )

}