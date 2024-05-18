import { Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Text, View, StyleSheet } from "react-native";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSession } from "@/provider/ctx";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace("(tabs)/");
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Heading text="Войти" />
      <Input
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Enter password"
        isPassword={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Войти"
        onPress={handleLogin}
      />
      <View style={styles.footer}>
        <Text>Нет аккаунта? <Link style={styles.link} href="/registration">Зарегистрироваться</Link></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  footer: {
    marginTop: 20,
  }
});
