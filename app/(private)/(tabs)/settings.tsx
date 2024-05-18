import { StyleSheet, Text, View } from 'react-native'
import { useSession } from '@/provider/ctx'

const Settings = () => {
    const { signOut } = useSession();
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}>
          Sign Out
        </Text>
      </View>
    );
}

export default Settings

const styles = StyleSheet.create({})