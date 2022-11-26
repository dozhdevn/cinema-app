import { StyleSheet } from 'react-native'
import { BACKGROUND_COLOR } from '../../constants/Colors'

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    right: -2,
    backgroundColor: BACKGROUND_COLOR,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(107, 114, 128)',
  },
})

export default styles
