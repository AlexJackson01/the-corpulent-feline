import { StyleSheet, View } from "react-native";
import Constants from './Constants'
import { GameEngine } from "react-native-game-engine";
import Matter from 'matter-js'
import { useRef, useState } from "react";
import Bird from './Bird'

        
const App = () => {

    const gameEngine = useRef(null)

    const setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false })
        let world = engine.world;

        let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 50, 50)

        Matter.World.add(world, [bird])

        return {
            physics: { engine: engine, world: world },
            bird: { body: bird, size: [50, 50], color: 'red', renderer: Bird }
        }
    }

    return (
        <View>
             <GameEngine ref={gameEngine} style={styles.gameContainer} entities={setupWorld()}/>
        </View>
    );
};

const styles = StyleSheet.create({

})
export default App;