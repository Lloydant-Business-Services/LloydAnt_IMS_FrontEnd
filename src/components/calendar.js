import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'


export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {

    this.setState({
      editorState,
    });
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())), "Perss")
  };

  render() {
    const {editorState} = this.state;
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    return (
      <>
      <textarea value>

      </textarea>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
      </>
    )
  }
}
