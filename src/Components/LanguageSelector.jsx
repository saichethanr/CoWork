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

const LanguageSelector = ({language,onSelect}) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={1} fontSize='lg' color="White">
        Language:
      </Text>
      <Menu isLazy>
  <MenuButton as={Button} >
    {language}
  </MenuButton>
  <MenuList bg="#1100c1b">
    {
        languages.map(([lang,version])=>(
            <MenuItem key={lang} 
            color={
                lang===language? "white.900":""
            }
            bg={
                lang===language? "gray.700":"white"
            }
            _hover={{
                color:"blue.900",
                bg:"white.700"
            }
            }
            onClick={()=>onSelect(lang)}>{lang}
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
