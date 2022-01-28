import AppLoading from 'expo-app-loading';
import { 
  StyleSheet, 
  Text,
  View,
  StatusBar,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useFonts } from 'expo-font';
import { Themes, Icons, Profiles } from './assets/Themes';
import {useState} from 'react';



export default function App() {
  const [theme, setTheme] = useState(Themes.light);
  let [fontsLoaded] = useFonts({
    Sydney: require('./assets/Fonts/Sydney-Serial-Regular.ttf'),
    'Sydney-Bold': require('./assets/Fonts/Sydney-Serial-Bold.ttf'),
  });
  if (!fontsLoaded) return <AppLoading />;
  /* ^Don't mind/edit the code above, it's there to load the font for you! */
  StatusBar.setBarStyle(theme.statusBar);
  /* ^Don't mind/edit this one either unless you decide to do the dark theme one, in that case, you will have to change it accordingly*/
  const BottomIcon = (props) => {
    return (
      <View style={styles.iconAndText}> 
        <Image source={props.icon} style={styles.botBarIcon}/>
        <Text style={{...styles.botText, ...{ color: theme.textSecondary }}}>{props.text}</Text>
      </View>
    );
  }
  const MTLProfile = {
    source: Profiles.mtl.image,
    name: Profiles.mtl.name,
    distance: Profiles.mtl.caption,
  }

  const Profile = (props) => {
    return (
    <View style={styles.profilePicInfo}>
      <ImageBackground source={props.source} style={styles.proPic} imageStyle={{borderRadius: 10}}>
        <View style={styles.proTextView}>
          <Text style={{...styles.proText, ...{fontSize: Platform.isPad ? 48:32, color: theme.textSecondary}}}>{props.name}</Text>
        </View>
        <View style={styles.proTextView2}>
          <Text style={{...styles.proText, ...{fontSize: Platform.isPad ? 32:20, color: theme.textSecondary}}}>{props.distance}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
return (
    <View style={{...styles.container, ...{backgroundColor: theme.bg}}}>
      <SafeAreaView style={styles.topContainer}>
        <View style = {{...styles.navBar,...{height: Platform.OS === "ios" ? 41 : 54}}}>
          <Image source={Icons.menu[theme.key]} style={styles.navBarIcon}/>
          <Text style={{...styles.title, ...{fontSize: Platform.isPad ? 50 : 36, color: theme.text }}}>ensom</Text>
          <TouchableOpacity onPress={() => setTheme(theme.key === "dark" ? Themes.light : Themes.dark)}>
            <Image source={theme.key === "light" ? Icons.sun : Icons.moon} style={styles.navBarIcon} />
          </TouchableOpacity>
        </View>
        <View style={{...styles.profile, ...{paddingHorizontal: Platform.isPad ? 50:20, 
                                                shadowOffset: theme.shadows.shadowOffset,
                                                shadowColor: theme.shadows.shadowColor,
                                                shadowRadius: theme.shadows.shadowRadius,
                                                shadowOpacity: theme.shadows.shadowOpacity}}}>
          <Profile 
            source={MTLProfile.source}
            name={MTLProfile.name}
            distance={MTLProfile.distance}
          />
          <View style={{...styles.hotTake, ...{ backgroundColor: theme.bgSecondary }}}>
            <Text style={{...styles.hotTakeText, ...{ color: theme.text }}}>My hottest take</Text>
            <View style={styles.playerSound}>
              <Image source={Icons.player[theme.key]} style={styles.player}/>
              <Image source={Icons.audioWave[theme.key]} style={styles.audioWave}/>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={{...styles.botBar, ...{ backgroundColor: theme.navigation }}}>
          <BottomIcon text='Discover' icon={Icons.discover[theme.key]}/>
          <BottomIcon text='Matches' icon={Icons.heart[theme.key]}/>
          <BottomIcon text='DMs' icon={Icons.messages[theme.key]}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  topContainer:{
    flex: 1,
    width: '100%',
  },
  navBar: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  navBarIcon: {
    width: 36,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Sydney-Bold', 
    paddingLeft: '25%',
    paddingRight: '25%',
  },
  profile: {
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'column',
  },
  profilePicInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  proPic: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proText: {
    fontFamily: 'Sydney',
  },
  proText2:{
    fontFamily: 'Sydney',
  },
  proTextView: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  proTextView2: {
    position: 'absolute',
    left: '3%',
    bottom: '3%',
  },
  hotTake: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  hotTakeText:{
    fontFamily:'Sydney',
    fontSize: 28,
    paddingBottom: 20,
  },
  playerSound: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioWave: {
    flex: 3,
    height: '100%',
    resizeMode: 'contain',
  },
  player: {
    flex: 1,
    height: 70,
    resizeMode: 'contain',
  },
  botBar: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botBarIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  botText:{
    fontFamily: 'Sydney',
    fontSize: 20,
  },
  iconAndText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
