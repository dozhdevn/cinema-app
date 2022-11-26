import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    color: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 2,
    fontSize: 24,
    fontWeight: '600',
  }
})

export default styles
