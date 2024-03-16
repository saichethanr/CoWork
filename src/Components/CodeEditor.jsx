import {useState,useRef} from 'react'
import {Box, HStack} from "@chakra-ui/react"
import { Editor } from '@monaco-editor/react'
import LanguageSelector from './LanguageSelector'
import { CODE_SNIPPETS } from './constant'
import Output from './Output'
import ACTIONS from '../Actions'

const CodeEditor = ({socketRef}) => {
  const editorRef=useRef()
  const [value,setValue]=useState('')
  const[language,setLanguage]=useState('javascript')

  const onMount=(editor)=>{
    editorRef.current=editor;
    editor.focus();
  };

  const onSelect=(language)=>{
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  }

    //little worked
    if(socketRef.current){
      socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
        setValue(code);
       console.log(code);
      //  if(editorRef){
      //       editorRef.current.setValue(code);
      //  }
    
     })
    }

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="100vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language}/>
      </HStack>
    </Box>
  );
}

export default CodeEditor
