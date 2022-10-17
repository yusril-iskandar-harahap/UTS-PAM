import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Audio } from 'expo-av';

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./NOAH.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>

      <View style={styles.judul}>
        <Text style={styles.bold}>Pemutar Video Sederhana</Text>
      </View>
      <Video
        ref={video}
        style={styles.video}
        source={
          require("./warcraft3.mp4")
        }
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
      <View style={styles.judul}>
        <Text style={styles.bold}>Pemutar Musik Sederhana</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Putar" onPress={playSound} />
      </View>
      <View style={styles.noah}>
        <Text style={styles.judulMusik}>NOAH - Kupu-Kupu Malam</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 340,
    height: 220,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  judul: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: 50,
    marginTop: 10,
  },
  bold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  noah: {
    alignItems: 'center',
  },
  judulMusik: {
    fontSize: 14,
  }
});
