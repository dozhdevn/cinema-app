import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    color: '#ffffff',
    opacity: 0.8,
    fontSize: 30,
    fontWeight: '600',
  },
  headerRight: {
    position: 'relative',
    flexDirection: 'row',
  },
  navMenu: {
    position: 'absolute',
    width: 144,
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 10,
    right: 0,
    top: 64,
    zIndex: 10,
  },
})

export default styles
