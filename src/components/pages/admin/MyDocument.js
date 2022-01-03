import React from "react";
import {Page, Text, View, Document, StyleSheet, Image, PDFViewer} from "@react-pdf/renderer";
import { QRCode } from "react-qr-svg";


export function PdfDocument(props) {
    return (
        
            <QRCode
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 256 }}
                value="some text"
            />
         
    );
}

export default PdfDocument;