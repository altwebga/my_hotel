import { Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Text, View, StyleSheet } from "react-native";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSession } from "@/provider/ctx";

export default function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useSession();
  const router = useRouter();

  const handleRegistration = async () => {
    try {
      await register(username, email, password);
      router.replace("(tabs)/");
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Heading text="Зарегистрироваться" />
      <Input
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
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
        title="Зарегистрироваться"
        onPress={handleRegistration}
        style={styles.customButton}
      />
      <View style={styles.footer}>
        <Text>Есть аккаунт? <Link style={styles.link} href="/login">Войти</Link></Text>
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
  },
  customButton: {
    marginTop: 20,
  }
});
