import {useState,useRef} from 'react'
import {Box} from "@chakra-ui/react"
import { Editor } from '@monaco-editor/react'
import LanguageSelector from './LanguageSelector'
const CodeEditor = () => {
  const editorRef=useRef()
  const [value,setValue]=useState('')

  const onMount=(editor)=>{
    editorRef.current=editor;
    editor.focus();
  }
  return (
    <Box>
      <LanguageSelector/>
      <Editor 
      height="100vh" 
      defaultLanguage="javascript" 
      theme="vs-dark"
      defaultValue="//Some comment" 
      value={value}
      onMount={onMount}
      onChange={(value)=>setValue(value)}
      />
      
    </Box>
  )
}

export default CodeEditor
