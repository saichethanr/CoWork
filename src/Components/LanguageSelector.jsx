import { Box, Text} from '@chakra-ui/react'
import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from '@chakra-ui/react'
import {LANGUAGE_VERSIONS} from './constant.js'

  const languages=Object.entries(LANGUAGE_VERSIONS)
const LanguageSelector = () => {
  return (
    <Box>
      <Text mb={1} fontSize='lg' color="White">
        Language:
      </Text>
      <Menu >
  <MenuButton as={Button} sx={{
      bg: "blue.500", // Background color
      color: "Blue", // Text color
      borderRadius: "md", // Border radius
      width: "110px", // Width of the button
      height: "20px",// Height of the button
      _hover: { // Hover state
        bg: "blue.600",
      },
      _active: { // Active state
        bg: "blue.700",
},
}}>
    Javascript
  </MenuButton>
  <MenuList zIndex={10}>
    {
        languages.map(([language,version])=>(
            <MenuItem key={language}>{language}
            &nbsp;
            <Text as="span" color="gray.600" fontSize="sm">
                {version}
            </Text>
            
            </MenuItem>
        ))
    }
  </MenuList>
</Menu>

</Box>
  )
}

export default LanguageSelector;
