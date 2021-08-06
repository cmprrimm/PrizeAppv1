import React from 'react'
import { View, TextInput, Text } from "react-native";
import { Avatar } from "react-native-elements";
import av1 from '../assets/avatars/elyse.png';


const avatarP = {
    elyse: av1,

};

export default function PickAvatar() {
    //const selectedColor = Colors;
    const [avatar, setAvatar] = React.useState(avatarP.elyse);


    return (
        <>
            <View>
                <Avatar
                    size="small"
                    rounded
                    overlayContainerStyle={{ backgroundColor: color }}
                />
            </View>


            <ColorPalette
                title={"pick your avatar"}

                onChange={setAvatar}
                value={avatar}
                colors={Object.values(avatarP)}
                icon={<Text>✔</Text>}
            />
        </>
    );
}