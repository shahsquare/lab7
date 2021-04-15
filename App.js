import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  FlatList,
} from "react-native";

export default function App() {
  const CustomButton = ({ buttonText, buttonNumber, buttonSymbol }) => {
    return (
      <Pressable
        style={{
          alignItems: "center",
          color: "red",
          borderColor: "grey",
          height: 80,
          width: 80,
          borderWidth: 2,
          padding: 22,
        }}
        onPress={() => buttonSymbol(buttonText, buttonNumber)}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
          {buttonText}
        </Text>
      </Pressable>
    );
  };

  const [buttons, setbuttons] = useState([
    { button: 1, buttonText: "" },
    { button: 2, buttonText: "" },
    { button: 3, buttonText: "" },
    { button: 4, buttonText: "" },
    { button: 5, buttonText: "" },
    { button: 6, buttonText: "" },
    { button: 7, buttonText: "" },
    { button: 8, buttonText: "" },
    { button: 9, buttonText: "" },
  ]);

  const [playerTurn, setPlayerTurn] = useState(true);
  const [getWinningModal, setWinningModal] = useState(false);

  //mark the player symbol on the board
  const playerMark = (txt, index) => {
    if (txt == "") {
      let buttonsList = [...buttons];
      if (playerTurn == 1) {
        buttonsList[index - 1].buttonText = "O";
      } else {
        buttonsList[index - 1].buttonText = "X";
      }
      setbuttons(buttonsList);
      setPlayerTurn(!playerTurn);
      checkWinningCombo();
    }
  };

  //game logiv - check if a winning combination is achieved
  const checkWinningCombo = () => {
    let buttonsList = [...buttons];
    if (
      (buttonsList[0].buttonText.toString() == "X" &&
      buttonsList[1].buttonText.toString() == "X" &&
      buttonsList[2].buttonText.toString() == "X") ||

      (buttonsList[3].buttonText.toString() == "X" &&
      buttonsList[4].buttonText.toString() == "X" &&
      buttonsList[5].buttonText.toString() == "X") ||

      (buttonsList[6].buttonText.toString() == "X" &&
      buttonsList[7].buttonText.toString() == "X" &&
      buttonsList[8].buttonText.toString() == "X") ||

      (buttonsList[0].buttonText.toString() == "X" &&
      buttonsList[3].buttonText.toString() == "X" &&
      buttonsList[6].buttonText.toString() == "X") ||

      (buttonsList[1].buttonText.toString() == "X" &&
      buttonsList[4].buttonText.toString() == "X" &&
      buttonsList[7].buttonText.toString() == "X") ||

      (buttonsList[2].buttonText.toString() == "X" &&
      buttonsList[5].buttonText.toString() == "X" &&
      buttonsList[8].buttonText.toString() == "X") ||

      (buttonsList[0].buttonText.toString() == "X" &&
      buttonsList[4].buttonText.toString() == "X" &&
      buttonsList[8].buttonText.toString() == "X") ||

      (buttonsList[2].buttonText.toString() == "X" &&
      buttonsList[4].buttonText.toString() == "X" &&
      buttonsList[6].buttonText.toString() == "X") ||

      (buttonsList[0].buttonText.toString() == "O" &&
      buttonsList[1].buttonText.toString() == "O" &&
      buttonsList[2].buttonText.toString() == "O") ||

      (buttonsList[3].buttonText.toString() == "O" &&
      buttonsList[4].buttonText.toString() == "O" &&
      buttonsList[5].buttonText.toString() == "O") ||

      (buttonsList[6].buttonText.toString() == "O" &&
      buttonsList[7].buttonText.toString() == "O" &&
      buttonsList[8].buttonText.toString() == "O") ||

      (buttonsList[0].buttonText.toString() == "O" &&
      buttonsList[3].buttonText.toString() == "O" &&
      buttonsList[6].buttonText.toString() == "O") ||

      (buttonsList[1].buttonText.toString() == "O" &&
      buttonsList[4].buttonText.toString() == "O" &&
      buttonsList[7].buttonText.toString() == "O") ||

      (buttonsList[2].buttonText.toString() == "O" &&
      buttonsList[5].buttonText.toString() == "O" &&
      buttonsList[8].buttonText.toString() == "O") ||

      (buttonsList[0].buttonText.toString() == "O" &&
      buttonsList[4].buttonText.toString() == "O" &&
      buttonsList[8].buttonText.toString() == "O") ||

      (buttonsList[2].buttonText.toString() == "O" &&
      buttonsList[4].buttonText.toString() == "O" &&
      buttonsList[6].buttonText.toString() == "O") 

      
    ) {
      setWinningModal(true);
    }
  };

  const newGame = () => {
    setWinningModal(false);
    let buttonsList = [...buttons];
    setbuttons(buttonsList);
  };

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 20,
            padding: 20,
            color: "red",
            fontWeight: "bold",
          }}
        >
          TURN: PLAYER {playerTurn ? 1 : 2}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: "white",
            fontWeight: "bold",
            backgroundColor: "purple",
            marginBottom: 15,
          }}
        >
          O - Player 1
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingLeft:60}}>
        <FlatList
          numColumns={3}
          data={[...buttons]}
          renderItem={({ item }, index) => (
            <CustomButton
              buttonText={item.buttonText}
              buttonNumber={item.button}
              buttonSymbol={playerMark}
            />
          )}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: "white",
            fontWeight: "bold",
            backgroundColor: "orange",
            marginTop: 15,
          }}
        >
          X - Player 2
        </Text>
        <StatusBar style="auto" />
      </View>

      <Modal
        visible={getWinningModal}
        
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 200,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 20, margin: 5, fontWeight:"bold" }}>WE HAVE A WINNER!</Text>
            <Text>PLAYER {!playerTurn ? 1 : 2} WINS</Text>

            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "purple",
                padding: 20,
                margin: 10,
              }}
              onPress={newGame.bind()}
            >

              <Text style={{ color: "white" }}>PLAY AGAIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
