import { Dimensions } from "react-native";

export default Constants = {
    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    GAP_SIZE: 200,
    BUILDING_WIDTH: 100,
    CAT_WIDTH: 64 + (64 / 2),
    CAT_HEIGHT: 48 + (48 / 2)
}