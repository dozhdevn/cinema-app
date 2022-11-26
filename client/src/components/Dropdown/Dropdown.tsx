import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker'

interface DropdownProps {
  options: ItemType<any>[]
  value: any
  onChange: (...event: any[]) => void
  isMulti?: boolean
}
DropDownPicker.setTheme('DARK')
DropDownPicker.setListMode('SCROLLVIEW')

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value: val,
  onChange,
  isMulti,
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[] | null>(val)
  const [items, setItems] = useState(options)

  return (
    <View style={{ zIndex: 10 }}>
      <DropDownPicker
        open={open}
        items={items}
        value={value}
        setOpen={setOpen}
        setItems={setItems}
        setValue={setValue}
        multiple={isMulti}
        onChangeValue={(value: any) => {
          onChange(value)
        }}
        mode="BADGE"
        activityIndicatorColor="#BF3335"
        style={{
          backgroundColor: '#232323',
          paddingHorizontal: 16,
          marginVertical: 6,
        }}
        textStyle={{
          fontSize: 16,
        }}
        placeholderStyle={{
          color: '#5A595D',
        }}
        dropDownContainerStyle={{
          backgroundColor: '#232323',
        }}
        showBadgeDot={false}
        labelStyle={{
          fontWeight: 'bold',
          color: 'red',
        }}
      />
    </View>
  )
}

export default Dropdown
