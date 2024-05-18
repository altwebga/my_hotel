import { router } from "expo-router";
import React, { useState } from 'react';
import { Text, View } from "react-native";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Input from "@/components/Input";

import { useSession } from "@/provider/ctx";

export default function Login() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Heading text="Войти" />
      <Input
        placeholder="Enter text"
        value={text}
        onChangeText={setText}
      />
      <Input
        placeholder="Enter password"
        isPassword={true}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Войти"
        onPress={() => {
          signIn();
          router.replace("(tabs)/");
        }}
      />
    </View>
  );
}
