import { Text, TouchableOpacity } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}

export default function Botao({title, onPress}: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={{
            padding: 10,
            backgroundColor: 'blue',
            borderRadius: 5,
        }}>
            <Text style={{color: 'white', fontSize: 16}}>
                {title}
            </Text>
        </TouchableOpacity>
    )

}