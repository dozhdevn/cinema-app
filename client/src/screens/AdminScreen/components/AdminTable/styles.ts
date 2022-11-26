import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DC3F41',
    marginTop: 8,
    height: 40,
    borderRadius: 8,
  },
  headerItem: {
    width: 128,
  },
  headerText: {
    opacity: 0.9,
    color: '#fff',
    fontWeight: '600',
  },
  action: {
    marginLeft: 8,
    width: 64,
  }
})

export default styles
