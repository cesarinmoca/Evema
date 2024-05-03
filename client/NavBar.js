import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#6369a8',
  white: '#fff',
};

const NavBar = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const screenNames = ['NuevoEvento', 'ObservarEventos', 'LeerTickets', 'GestionarEventos'];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility on button press
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    if (isOpen) {
      // Animate dropdown in when opening
      Animated.parallel([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 300, // Adjust duration as needed
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          slideAnim,
          {
            toValue: 1,
            duration: 300, // Adjust duration as needed
            useNativeDriver: true,
          }
        ),
      ]).start();
    } else {
      // Animate dropdown out when closing
      Animated.parallel([
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 300, // Adjust duration as needed
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          slideAnim,
          {
            toValue: 0,
            duration: 300, // Adjust duration as needed
            useNativeDriver: true,
          }
        ),
      ]).start();
    }
  }, [isOpen]);

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
        <Text style={styles.menuButtonText}>≣</Text>
      </TouchableOpacity>

      <Text style={styles.navTitle}>Evema</Text>

      <Animated.View style={[
        styles.dropdownContent,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }] }
      ]}>
        {screenNames.map((screenName, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dropdownButton, { backgroundColor: colors.primary }]}
            onPress={() => navigateToScreen(screenName)}
          >
            <Text style={styles.dropdownButtonText}>{screenName}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#007bff', // Blue background
        height: 60,
        padding: 16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // Allow elements to be placed side-by-side
        borderRadius: 5,
        position: 'relative', // Required for absolute positioning of dropdown
      },
      navTitle: {
        color: 'white', // White text
        fontSize: 20,
        fontWeight: 'bold',
      },
      menuButton: {
        padding: 10, // Adjust padding as needed
        backgroundColor: 'blue', // Set a background color for the button
        borderRadius: 5,
      },
    dropdownContent: {
      position: 'absolute', // Position the dropdown absolutely within NavBar
      top: 60, // Adjust top position if needed
      right: 0, // Position at the right side of NavBar
      backgroundColor: 'skyblue', // Customize dropdown background
      padding: 10,
      borderRadius: 5,
      shadowColor: '#ccc',
      width: '110%',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 0,
      borderRadius: 20,
    },
    dropdownButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginBottom: 5,
      borderRadius: 5,
    },
    menuButtonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 12, // Ajusta el espaciado para centrar verticalmente el texto
    },
      
    dropdownButtonText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  export default NavBar;