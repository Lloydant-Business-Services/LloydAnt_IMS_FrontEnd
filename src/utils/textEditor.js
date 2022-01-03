import $ from 'jquery';


export function makeBold() {
    document.execCommand( "bold" );
    if ( document.getElementById( "bold" ).isToggled ) {
      document.getElementById( "bold" ).style.backgroundColor = "#00cc55";
      document.getElementById( "bold" ).isToggled = false;
    } else {
      document.getElementById( "bold" ).style.backgroundColor = "#008833";
      document.getElementById( "bold" ).isToggled = true;
    }
  }
  
  function makeItalic() {
    document.execCommand( "italic" );
     if ( document.getElementById( "italic" ).isToggled ) {
      document.getElementById( "italic" ).style.backgroundColor = "#00cc55";
      document.getElementById( "italic" ).isToggled = false;
    } else {
      document.getElementById( "italic" ).style.backgroundColor = "#008833";
      document.getElementById( "italic" ).isToggled = true;
    }
  }
  
  function doUnderline() {
    document.execCommand( "underline" );
     if ( document.getElementById( "underline" ).isToggled ) {
      document.getElementById( "underline" ).style.backgroundColor = "#00cc55";
      document.getElementById( "underline" ).isToggled = false;
    } else {
      document.getElementById( "underline" ).style.backgroundColor = "#008833";
      document.getElementById( "underline" ).isToggled = true;
    }
  }
  
  function doAddImage() {
    var image_url = prompt( "Image URL:" );
    if (image_url != "") {
      document.execCommand( "insertImage", false, image_url);
    } else {
      alert( "You must set a URL!" );
    }
  }
  
  function justifyLeft() {
    document.execCommand( "justifyLeft" );
  }
  
  function justifyCenter() {
    document.execCommand( "justifyCenter" );
  }
  
  function justifyRight() {
    document.execCommand( "justifyRight" );
  }
  
  function doSetTextColor() {
    var text_color = prompt( "CSS Color:" );
    if (text_color != "") {
      document.execCommand( "foreColor", false, text_color);
    } else {
      alert( "You must set a Color!" );
    }
  }